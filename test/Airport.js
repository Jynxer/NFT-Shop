const { assert } = require('chai');

const Airport = artifacts.require("./Airport.sol");

require('chai').use(require('chai-as-promised')).should();

contract('Airport', (accounts) => {
    let contract;

    before(async () => {
        contract = await Airport.deployed();
    });

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = contract.address;
            //console.log(address);
            assert.notEqual(address, '');
            assert.notEqual(address, 0x0);
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });

        it('has a name', async () => {
            const name = await contract.name();
            assert.equal(name, 'MyAirportCollectible');
        });

        it('has a symbol', async () => {
            const symbol = await contract.symbol();
            assert.equal(symbol, 'MAC');
        });
    });

    describe('minting', async () => {
        it('creates a new token', async () => {
            const result = await contract.mint('https://ipfs.io/ipfs/QmeojfPuNsDvPihM5Rq3ktxpTmE3cRHdHdQ1WgkE8462CA');
            const totalSupply = await contract.totalSupply();
            // SUCCESS
            assert.equal(totalSupply, 1, 'totalSupply is correct');
            const event = result.logs[0].args;
            //console.log(event);
            assert.equal(event.tokenId.toNumber(), 1, 'id is correct');
            assert.equal(event.from, 0x0000000000000000000000000000000000000000, 'from is correct');
            assert.equal(event.to, accounts[0], 'to is correct');
            // FAILURE: cannot mint same image twice!
            await contract.mint('https://ipfs.io/ipfs/QmeojfPuNsDvPihM5Rq3ktxpTmE3cRHdHdQ1WgkE8462CA').should.be.rejected;
        });
    });

    describe('indexing', async () => {
        it('lists images', async () => {
            // Mint 2 more tokens
            await contract.mint('https://ipfs.io/ipfs/QmXjTikmSDcKdt2HEXFgrASXpi56nXzQGeN1oemzCa51jC');
            await contract.mint('https://ipfs.io/ipfs/QmecZChF7BKTWRqGh2pnVmLbQGYzxzXuxaMEZcGxpucaKF');
            let image;
            let result = [];
            for (var i = 1; i <= 3; i++) {
                image = await contract.images(i - 1);
                result.push(image);
            }
            let expected = ['https://ipfs.io/ipfs/QmeojfPuNsDvPihM5Rq3ktxpTmE3cRHdHdQ1WgkE8462CA', 'https://ipfs.io/ipfs/QmXjTikmSDcKdt2HEXFgrASXpi56nXzQGeN1oemzCa51jC', 'https://ipfs.io/ipfs/QmecZChF7BKTWRqGh2pnVmLbQGYzxzXuxaMEZcGxpucaKF'];
            assert.equal(result.join(','), expected.join(','));
        });
    });
});