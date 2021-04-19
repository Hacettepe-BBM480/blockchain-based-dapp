// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract MyContract {
    address public owner = msg.sender;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can access");
        _;
    }

    struct Student {
        string id;
        string studentNo;
        File[] studentFiles;
        /*
        *
        * This struct includes id, studentNo,studentFiles...
        *
        */
    }

    struct File {
        string id;
        string fileHash;
        uint256 fileSize;
        string fileType;
        string fileName;
        string fileDescription;
        uint256 uploadTime;
        string studentId;
    }

    uint256 private studentCount;
    mapping(string => Student) private students;
    mapping(string => string) private studentsNoToId;

    uint256 private fileCount;
    mapping(string => File) private files;

    event addStudentEvent(string id, string studentNo);
    event deleteStudentEvent(string id, string studentNo);
    event updateStudentEvent(string id, string studentNo);
    event FileUploaded(
        string fileId,
        string fileHash,
        uint256 fileSize,
        string fileType,
        string fileName,
        string fileDescription,
        uint256 uploadTime,
        string studentNo
    );

    function getStudent(string memory _studentNo) public view onlyOwner returns(string memory,string memory){
        string memory _id = studentsNoToId[_studentNo];
        Student memory student = students[_id];
        return (_id,student.studentNo);
        
    }

    function addStudent(string memory _id, string memory _studentNo)
        public
        onlyOwner
    {
        Student storage newStudent = students[_id];
        studentsNoToId[_studentNo] = _id;
        studentCount++;
        newStudent.id = _id;
        newStudent.studentNo = _studentNo;
        emit addStudentEvent(_id, _studentNo);
    }

    function deleteStudent(string memory _studentNo) public onlyOwner {
        string memory _id = studentsNoToId[_studentNo];
        delete studentsNoToId[_studentNo];
        delete students[_id];
        studentCount--;
        emit deleteStudentEvent(_id, _studentNo);
    }

    function updateStudent(string memory _id, string memory _studentNo)
        public
        onlyOwner
    {
        Student storage student = students[_id];
        delete studentsNoToId[student.studentNo];
        studentsNoToId[_studentNo] = student.id;
        student.studentNo = _studentNo;
        emit updateStudentEvent(_id, _studentNo);
    }

    function uploadFile(
        string memory _id,
        string memory _fileHash,
        uint256 _fileSize,
        string memory _fileType,
        string memory _fileName,
        string memory _fileDescription,
        string memory _studentId
    ) public onlyOwner {
        // Example files[1] = File(1, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, now, msg.sender); // now=timestamp

        // Make sure the file hash exists
        require(bytes(_fileHash).length > 0);
        // Make sure file type exists
        require(bytes(_fileType).length > 0);
        // Make sure file description exists
        require(bytes(_fileDescription).length > 0);
        // Make sure file fileName exists
        require(bytes(_fileName).length > 0);
        // Make sure uploader address exists
        require(msg.sender != address(0));
        // Make sure file size is more than 0
        require(_fileSize > 0);

        // Increment file id
        fileCount++;

        // Add File to the contract
        File storage newFile = files[_id];
        newFile.id = _id;
        newFile.fileHash = _fileHash;
        newFile.fileSize = _fileSize;
        newFile.fileType = _fileType;
        newFile.fileName = _fileName;
        newFile.fileDescription = _fileDescription;
        newFile.uploadTime = block.timestamp;
        newFile.studentId = _studentId;

        students[_studentId].studentFiles.push(files[_id]);

        // Trigger an event
        emit FileUploaded(
            _id,
            _fileHash,
            _fileSize,
            _fileType,
            _fileName,
            _fileDescription,
            block.timestamp,
            students[_studentId].studentNo
        );
    }

    function getFilesOfStudent(string memory studentNo)
        public
        view
        returns (File[] memory)
    {
        string memory id = studentsNoToId[studentNo];
        Student storage student = students[id];
        return student.studentFiles;
    }
}
