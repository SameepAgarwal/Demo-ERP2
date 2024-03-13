const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    class_name: {
        type: String,
        unique: true,
    },
    section_wise_division: {
        type: Boolean,
        default: false,
    },
    class_teacher: {
        type: String,
    },
    subjects: [
        {
            subject_name: {
                type: String,
            },
            subject_code: {
                type: String,
            }
        }
    ],
    class_strength: {
        type: Number,
        default: 0,
    },
    students: [
        {
            student_name: {
                type: String,
                required: true,
            },
            student_gender: {
                type: String,
                required: true,
            },
            student_rollno: {
                type: Number,
                required: true,
            },
            student_dob: {
                type: String,
                required: true,
            },
            student_address: {
                type: String,
                required: true,
            },
            student_marks: [
                {
                    subject_name: {
                        type: String,
                    },
                    subject_obtained_mark: {
                        type: Number,
                        default: null,
                    },
                    subject_total_mark: {
                        type: Number,
                        default: null,
                    }
                }
            ]
        }
    ],
    sections: [
        {
            section_name: {
                type: String,
            },
            section_strength: {
                type: Number,
                default: 0,
            },
            section_teacher: {
                type: String,
            },
            section_name: {
                type: String,
            },
            section_subjects: [
                {
                    subject_name: {
                        type: String,
                    },
                    subject_code: {
                        type: String,
                    }
                }
            ],
            students: [
                {
                    student_name: {
                        type: String,
                        required: true,
                    },
                    student_gender: {
                        type: String,
                        required: true,
                    },
                    student_rollno: {
                        type: Number,
                        required: true,
                    },
                    student_dob: {
                        type: String,
                        required: true,
                    },
                    student_address: {
                        type: String,
                        required: true,
                    },
                    student_marks: [
                        {
                            subject_name: {
                                type: String,
                            },
                            subject_obtained_mark: {
                                type: Number,
                                default: null,
                            },
                            subject_total_mark: {
                                type: Number,
                                default: null,
                            }
                        }
                    ]
                }
            ]
        }
    ]
});


const ClassModel = mongoose.model('ClassModel', ClassSchema);


module.exports = ClassModel;