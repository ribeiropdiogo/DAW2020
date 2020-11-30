var Student = require('../models/student')

module.exports.list = () => {
    return Student 
        .find()
        .sort({nome: 1})
        .exec()
}

module.exports.lookUp = id => {
    return Student 
        .findOne({numero: id})
        .exec()
}

module.exports.insert = student => {
    student.tpc = [0,0,0,0,0,0,0,0]
    var newStudent = new Student(student)
    return newStudent.save()
}

module.exports.update = student => {
    return Student 
        .updateOne({numero: student.number},{nome: student.name, git: student.git, tpc: student.tpc})
        .exec()
}

module.exports.delete = id => {
    return Student 
        .deleteOne({numero: id})
        .exec()
}