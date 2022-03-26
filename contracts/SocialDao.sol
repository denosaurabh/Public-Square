// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

contract SocialDAO {
    event Deposit(address indexed sender, uint amount, uint balance);
    event SubmitTransaction(
        address indexed owner,
        uint indexed txIndex,
        address indexed to,
        uint value,
        bytes data
    );
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint indexed txIndex);

    string public name;
    string public lensProfileId;
    string[] public constitution;
    address[] public owners;
    string[] public infoUris;

    mapping(address => bool) public isOwner;
    uint public numConfirmationsRequired;

    struct OwnerProposal {
        address who;
        bytes data;
    }

    OwnerProposal[] public ownerProposals;
    mapping(address => bool) public isUserProposing;

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint numConfirmations;
    }

    // mapping from tx index => owner => bool
    mapping(uint => mapping(address => bool)) public isConfirmed;

    Transaction[] public transactions;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }

    modifier txExists(uint _txIndex) {
        require(_txIndex < transactions.length, "tx does not exist");
        _;
    }

    modifier notExecuted(uint _txIndex) {
        require(!transactions[_txIndex].executed, "tx already executed");
        _;
    }

    modifier notConfirmed(uint _txIndex) {
        require(!isConfirmed[_txIndex][msg.sender], "tx already confirmed");
        _;
    }

    constructor(address[] memory _owners, uint _numConfirmationsRequired, string memory _name, string[] memory _constitution) {
        require(_owners.length > 0, "one or more than one owners are required");
        require(_constitution.length > 0, "A detailed Constitution required");
        // require(!_name, "DAO name is required");
        require(
            _numConfirmationsRequired > 0 &&
                _numConfirmationsRequired <= _owners.length,
            "invalid number of required confirmations"
        );

        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }

        numConfirmationsRequired = _numConfirmationsRequired;

        name = _name;
        constitution = _constitution;
    }

    function setLensProfileAndInfo(string memory _lensProfileId, string[] memory _infoUris) public onlyOwner {
        lensProfileId = _lensProfileId;
        infoUris = _infoUris;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    function submitTransaction(
        address _to,
        uint _value,
        bytes memory _data
    ) public onlyOwner {
        uint txIndex = transactions.length;

        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                executed: false,
                numConfirmations: 0
            })
        );

        emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
    }

    function confirmTransaction(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
        notConfirmed(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
        transaction.numConfirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;

        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    function executeTransaction(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];

        require(
            transaction.numConfirmations >= numConfirmationsRequired,
            "cannot execute tx"
        );

        transaction.executed = true;

        (bool success, ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );
        require(success, "tx failed");

        emit ExecuteTransaction(msg.sender, _txIndex);
    }

    function revokeConfirmation(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];

        require(isConfirmed[_txIndex][msg.sender], "tx not confirmed");

        transaction.numConfirmations -= 1;
        isConfirmed[_txIndex][msg.sender] = false;

        emit RevokeConfirmation(msg.sender, _txIndex);
    }

    function publishProposalForOwner(address _proposalUser, bytes memory _data)
        public
    {
        require(!isOwner[_proposalUser], "owner already exists");
        require(_proposalUser != address(0), "invalid user");

        ownerProposals.push(OwnerProposal(_proposalUser, _data));

        isUserProposing[_proposalUser] = true;
    }

    function addOwner(address _newOwner) 
        public
    {
        require(!isOwner[_newOwner], "owner already exists");
        require(isUserProposing[_newOwner], "user hasnt proposed yet!");
        require (msg.sender == address(this), "Call not send by contract");

        isOwner[_newOwner] = true;
        owners.push(_newOwner);
    }

    function removeOwner(address _removingOwner) 
        public
    {
        require(!isOwner[_removingOwner], "owner doesn't exist");
        require (msg.sender == address(this), "Call not send by contract");

        isOwner[_removingOwner] = false;
        // delete owners[_removingOwner];
    }

    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    function getInfo() public view returns (
        address[] memory, 
        string memory, 
        string[] memory, 
        string memory, 
        string[] memory
        ) 
    {

        return (owners, name, constitution, lensProfileId, infoUris);
    }

    function getTransactionCount() public view returns (uint) {
        return transactions.length;
    }

    function getTransaction(uint _txIndex)
        public
        view
        returns (
            address to,
            uint value,
            bytes memory data,
            bool executed,
            uint numConfirmations
        )
    {
        Transaction storage transaction = transactions[_txIndex];

        return (
            transaction.to,
            transaction.value,
            transaction.data,
            transaction.executed,
            transaction.numConfirmations
        );
    }
}

contract SuperDeno {
    string public constant NAME = "Super Deno";
    string[] public discipline;
    address[] public owners;

    SocialDAO[] public daos;

    string[] public daoNames;
    mapping(string => address) nameToDao;
    mapping(string => bool) nameToDaoExists;

    event SocialDaoCreated(address indexed sender, string name, string message);
    event DisciplineUpdated(string message);

    constructor(string[] memory _discipline) {
        owners.push(msg.sender);
        discipline = _discipline;
    }

    function createSocialDAO(address[] memory _owners, uint _numConfirmationsRequired, string memory _name, string[] memory _constitution) public payable {
        require(!nameToDaoExists[_name], "DAO already exists");
        
        SocialDAO dao = new SocialDAO(_owners, _numConfirmationsRequired, _name, _constitution);
        daos.push(dao);

        nameToDao[_name] = address(dao);
        nameToDaoExists[_name] = true;
        daoNames.push(_name);

        emit SocialDaoCreated(msg.sender, _name, "Dao has been created!");
    }

    function getDAOAddressByName(string memory _name) public view returns (address) {
        return nameToDao[_name];
    }

    function allDaoNames() public view returns (string[] memory _daoNames) {
        return daoNames;
    }

    function superDenoInfo() public view returns (
        string memory _superDaoName,
        string[] memory _discipline,
        address[] memory _owners
    ) {
        return (NAME, discipline, owners);
    }

    // function setDiscipline(string[] memory _newDiscipline) public {
    //     discipline = _newDiscipline;

    //     emit DisciplineUpdated("Super DAO Discipline has been updated");
    // }
}