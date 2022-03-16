var CustomERC721Token = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const name = "IsaacOB";
    const symbol = "IOB";
    const baseTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
    const TOKEN_MAX = 5;


    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new({from: account_one});

            // TODO: mint multiple tokens
            for (let i = 1; i <= TOKEN_MAX; i++) {
                await this.contract.mint(accounts[i], i);
              }
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply();
            assert.equal(totalSupply, TOKEN_MAX, "Total supply Incorrect");
            
        })

        it('should get token balance', async function () { 
            let tokenBalance = await this.contract.balanceOf(account_one);
            assert.equal(tokenBalance, 1, "Token balance not correct");     
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            const token = 1;
            let tokenURI = await this.contract.tokenURI(token);
            assert.equal(tokenURI, BASE_URI + token, "Token uri not correct");
            
        })

        it('should transfer token from one owner to another', async function () { 
           
            let owner2 = await this.contract.ownerOf(1);
            await this.contract.transferFrom(account_two, account_three, 1, { from: account_two });
            let owner1 = await this.contract.ownerOf(1);
            assert.equal(owner1, account_three, "Incorrect token amount");
            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name, Symbol,{from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            const token = 1;
            const minted = false;
            try {
                minted = await this.contract.mint(accounts[2], token, { from: account_two });
            } catch (e) {}
            assert.equal(minted, false, 'failed, contract owner is Required'); 
            
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner.call();
            assert.equal(owner, account_one, "Must be same owner");
            
        })

    });
})