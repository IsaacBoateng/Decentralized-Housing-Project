// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps

    
// Test verification with incorrect proof

// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var SquareVerifier  = artifacts.require('Verifier');
const Proof = require("../../zokrates/code/square/proof.json");



contract('TestSquareVerifier', accounts => {
    const owner = accounts[0];
   

    // Test verification with correct proof
    // - use the contents from proof.json generated from zokrates steps
	/*
    let proof = {
        "proof": {
            "a": ["0x2bea28ad70d09795705e8377a6543bd4c12c7384c2510a6a27aa4e4ef52e781d", "0x2e5e7e1be90dd4260290ff84f81a0e34c8673133bd708548a2d7938993c774cf"],
            "b": [["0x2899ee30ab363ff76444389df27857784a3ebf8894f88cee43e99d929de8d162", "0x0ba45f147e7ccb83ac9759a678243e105eb73957674998f0a2c4c01bbba3be12"], ["0x1b6d59aebcd427d2b4a727cc1d0bd37b6e0959701d28563a42e70a4f862fa99c", "0x2736d2746afc901c313189be8520c311d96629eecdbc6cfd5baa74ca63cc8539"]],
            "c": ["0x2ce75f3bd6ed5361f5dc12e1afcf78d8d128ad2087fde0cf0d4f05f305d37bd7", "0x28438d4dd845ab3a906899bbc636511a9907375ec2fba2d288c2375d36d3bdde"]
        },
        "inputs": ["0x0000000000000000000000000000000000000000000000000000000000000009", "0x0000000000000000000000000000000000000000000000000000000000000001"]
    }
	*/

    beforeEach(async () => {
	});

	// Test verification with correct proof
	// - use the contents from proof.json generated from zokrates steps
	it("Should successfully verify correct proof", async () => {
		this.contract = await SquareVerifier.new({ from: owner });
		let proofVerified = await this.contract.verifyTx.call(...Object.values(Proof.proof), Proof.inputs);

		assert.equal(proofVerified, true, "Proof could not be verified");
	});

	// Test verification with incorrect proof
	it("Should not verify incorrect proof", async () => {
		let proofVerified = await this.contract.verifyTx.call(...Object.values(Proof.proof), [16, 77]);

		assert.equal(proofVerified, false);
	});

   
});
       