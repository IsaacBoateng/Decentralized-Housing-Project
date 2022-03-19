pragma solidity >=0.4.21 <0.6.0;

import './SquareVerifier.sol';
import './ERC721Mintable.sol';

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SolnSquareVerifier is CustomERC721Token{


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class



// TODO define a solutions struct that can hold an index & an address

 struct Solution {
        uint256 index;
        address addr;      
}

// TODO define an array of the above struct
Solution[]  uniqSolutions;

// TODO define a mapping to store unique solutions submitted
mapping(bytes32 => Solution) private solutions;


// TODO Create an event to emit when a solution is added
event SolutionAdded(uint256 index, address addr);
event TokenMint(uint256 index, address addr);

 Verifier VerifierContract;

    constructor(string memory name, string memory symbol)
        public
        CustomERC721Token(name, symbol)
    {
        VerifierContract = new Verifier();
    }

    // checks if solution already exits
    modifier checkSolution(uint256 index, address addr) {
        bytes32 key = keccak256(abi.encodePacked(index, addr));
        require(solutions[key].addr == address(0), "Solution already exists");
        _;
    }


// TODO Create a function to add the solutions to the array and emit the event
 function addSolutions(uint256 index, address addr)  external checkSolution(index, addr) {
        Solution memory solution = Solution({index: index, addr: addr});
        bytes32 key = keccak256(abi.encodePacked(index, addr));
        solutions[key] = solution;
        uniqSolutions.push(solution);
        emit SolutionAdded(index, addr); 
}


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
function mintNFT(
        uint256[2] calldata a,
        uint256[2][2] calldata b,
        uint256[2] calldata c,
        uint256[2] calldata inputs,
        uint256 index,
        address addr
    ) external checkSolution(index, addr) {
        require(
            VerifierContract.verifyTx(a, b, c, inputs),
            "Solution is not verified"
        );
        this.addSolutions(index, addr);
        super.mint(addr, index);
        emit TokenMint(index, addr);
    }
}

  


























