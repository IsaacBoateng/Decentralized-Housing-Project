var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const truffleAssert = require("truffle-assertions");

contract('TestSolnSquareVerifier', accounts => {
    const account_one = accounts[0];
   
    
    beforeEach(async function () {
        this.contract = await SolnSquareVerifier.new("IsaacOB", "IOB", { from: account_one });
    })

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it("Should add a new solution can be added", async function () {
		const tx = await this.contract.addSolutions(1, accounts[1]);

		await truffleAssert.eventEmitted(tx, "SolutionAdded");
	}); 
    
    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('ERC721 token can be minted for contract', async function () {
        const { proof, inputs } = require("../../zokrates/code/square/proof.json");
		const tx = await this.contract.mintNFT(proof.a, proof.b, proof.c, inputs, 1, accounts[1]);
		await truffleAssert.eventEmitted(tx, "SolutionAdded");
		await truffleAssert.eventEmitted(tx, "TokenMint");
    });   
   
})
       