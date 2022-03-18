pragma solidity >=0.4.21 <0.6.0;

import './SquareVerifier.sol';
import './ERC721Mintable.sol';

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SolnSquareVerifier is ERC721MintableComplete{



    Verifier VerifierContract;

    constructor(string memory name, string memory symbol)
        public
        ERC721MintableComplete(name, symbol)
    {
        VerifierContract = new Verifier();
    }

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class



// TODO define a solutions struct that can hold an index & an address

 struct Solutions {
        uint256 index;
        address Address;      
}

// TODO define an array of the above struct
Solutions[]  uniqSolutions;

// TODO define a mapping to store unique solutions submitted
mapping(bytes32 => Solutions) private solutions;


// TODO Create an event to emit when a solution is added
event SolutionAdded(uint256 index, address Address);
event TokenMint(uint256 index, address Address);

// checks if solution already exits
modifier checkSolution(uint256 index, address Address) {
    bytes32 key = keccak256(abi.encodePacked(index, Address));
    require(solutions[key].Address == address(0), "Solution already exists");
    _;
}


// TODO Create a function to add the solutions to the array and emit the event
 function addSolutions(uint256 index, address Address) public checkSolution(index, Address) {
        Solutions memory solution = Solutions({index: index, Address: Address});
        bytes32 key = keccak256(abi.encodePacked(index, Address));
        solutions[key] = solution;
        uniqSolutions.push(solution);
        emit SolutionAdded(index, Address); 
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
        address Address
    ) external checkSolution(index, Address) {
        require(
            VerifierContract.verifyTx(a, b, c, inputs),
            "Solution is not verified"
        );
        this.addSolutions(index, Address);
        super.mint(Address, index);
        emit TokenMint(index, Address);
    }
}

  


























