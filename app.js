const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const {
    create
} = require("domain");

const teamMembers = [];

const managerQuestions = [{
        type: "input",
        name: "name",
        message: "What is the manager name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the manager id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the manager email?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager office number?"
    }
];
const internQuestions = [{
        type: "input",
        name: "name",
        message: "What is the intern's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the intern's id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the intern's email?"
    },
    {
        type: "input",
        name: "school",
        message: "What is the intern's school?"
    }
];
const engineerQuestions = [{
        type: "input",
        name: "name",
        message: "What is the engineer's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the engineer's id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the engineer's email?"
    },
    {
        type: "input",
        name: "github",
        message: "What is the engineer's github?"
    }
];

const createManager = () => {
    inquirer.prompt(managerQuestions).then((answers) => {
        const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        teamMembers.push(newManager);
        addMoreMembers();
    });
};
const createIntern = () => {
    inquirer.prompt(internQuestions).then((answers) => {
        const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
        teamMembers.push(newIntern);
        addMoreMembers();
    });
};
const createEngineer = () => {
    inquirer.prompt(engineerQuestions).then((answers) => {
        const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        teamMembers.push(newEngineer);
        addMoreMembers();
    });
};

const addMoreMembers = () => {
    inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "More Team Members?",
        choices: ["Manager", "Intern", "Engineer", "Hey No More"]
    }]).then((answer) => {
        switch (answer.choice) {
            case "Manager":
                createManager();
                break;
            case "Intern":
                createIntern();
                break;
            case "Engineer":
                createEngineer();
                break;
            default:
                fs.writeFileSync(outputPath, render(teamMembers),"utf8");
                break;
        }
    });
}

createManager();