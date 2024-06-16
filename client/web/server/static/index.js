let maelstrom_address = ""
let maelstrom_height = 0
const tokenKey = 'maelstrom_connected';

window.onload = () => {
    fetch("http://localhost:5051/v1/info")
    .then(response => response.text())
    .then(body => {
        const data = JSON.parse(body);
        console.log(data.address);
        maelstrom_address = data.address
        maelstrom_height = data.height
    })
    .catch(error => pop('Error connecting to maelstrom server'))
    if (localStorage.getItem(tokenKey)) {
        connectWallet()
    }
}

const connectWallet = async () => {
    if (!window.keplr) {
        popup("Keplr wallet is not available.");
    } else {
        const chainID = "celestia"
        await window.keplr.enable(chainID)
        const offlineSigner = window.keplr.getOfflineSigner(chainID);
        const accounts = await offlineSigner.getAccounts();
        const cosmJS = new SigningCosmosClient(
            "https://lcd-cosmoshub.keplr.app/rest",
            accounts[0].address,
            offlineSigner,
        );
        if (!localStorage.getItem(tokenKey)) {
            localStorage.setItem(tokenKey, 'true');
        }
        renderPage()
        await loadPage(accounts[0].address)   
    }
};

const renderPage = () => {
    document.getElementById('subtitle').style.display = 'none'
    document.getElementById('connectButton').style.display = 'none'
    document.getElementById('portal').style.display = 'block'
}

const loadPage = async (address) => {
    await updateBalances(address)
    document.getElementById('maelstrom-address').innerHTML = shortenAddress(maelstrom_address)
    document.getElementById('height').innerHTML = maelstrom_height
    document.getElementById('user-address').innerHTML = address
}

const popup = (msg) => {
    let popupDiv = document.querySelector('.popup');
    if (!popupDiv) {
        popupDiv = document.createElement('div');
        popupDiv.className = 'popup';
        document.body.appendChild(popupDiv);
    }
    popupDiv.textContent = msg;
    popupDiv.style.display = 'block';

    setTimeout(() => {
        if (popupDiv.style.display === 'block') {
            popupDiv.style.display = 'none';
        }
    }, 3000);
}

const updateBalances = async (address) => {
    return await fetch(`http://localhost:5051/v1/balance/${address}`)
    .then(response => response.text())
    .then(body => {
        const data = JSON.parse(body);
        console.log(data)
        celBalDiv = document.getElementById('celestia-balance')
        celBalDiv.innerHTML = data.celestiaBalance
        maelBalDiv = document.getElementById('maelstrom-balance')
        maelBalDiv.innerHTML = data.maelstromBalance
    })
    .catch(error => console.error('Error fetching balance:', String(error)))
}

const shortenAddress = (address) => {
    return address.slice(0, 6) + '...' + address.slice(-4)
}

const toTIA = (number) => {
    const parsedNumber = parseFloat(number);
    const dividedNumber = parsedNumber / 1000000;
    return dividedNumber.toFixed(3);
}
