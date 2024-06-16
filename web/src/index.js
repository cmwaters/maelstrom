const maelstrom = require('maelstrom-client')

let maelstrom_address = ""
let maelstrom_height = 0
let maelstrom_chain_id = ""
const tokenKey = 'maelstrom_connected';
let client = new maelstrom.Client("http://localhost:5051")

window.onload = () => {
    client.info()
    .then(info => {
        console.log(info)
        maelstrom_address = info.address
        maelstrom_height = info.height
        maelstrom_chain_id = info.chainId
    })
    .catch(error => popup('Error connecting to maelstrom server'))
    if (localStorage.getItem(tokenKey)) {
        window.connectWallet()
    }
}

window.connectWallet = async () => {
    if (!window.keplr) {
        popup("Keplr wallet is not available.");
    } else {
        let address = await client.connectToKeplr(window.keplr)
        .catch(error => popup('Error connecting to keplr wallet: ' + String(error)))
        console.log("ADDRESS: ", address)
        renderPage()
        await loadPage(address)   
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
    document.getElementById('chain-id').innerHTML = maelstrom_chain_id
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
    client.balance(address)
    .then(response => {
        celBalDiv = document.getElementById('celestia-balance')
        celBalDiv.innerHTML = response.celestiaBalance
        maelBalDiv = document.getElementById('maelstrom-balance')
        maelBalDiv.innerHTML = response.maelstromBalance
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

window.deposit = async () => {
    console.log("initiating deposit")
    client.deposit(100_000).catch(error => popup('Error depositing:', String(error)))
}
