#! /usr/bin/env node
import inquirer from "inquirer"

// Bank Account Interface
interface BankAccount{
    accounNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}

// Bank Account Class
class BankAccount implements BankAccount{
    accounNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accounNumber = accountNumber;
        this.balance = balance
    }
    
// Debit Money
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
        console.log(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
    }else {
        console.log("Insufficient balance.");
    }
}

// Credit Money
deposit(amount: number): void {
    if(amount > 100){
        amount -= 1; // $1 fee charged if more than $100 is deposited
    } this.balance += amount;
    console.log(`1Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
}

// Check Balance
checkBalance(): void {
    console.log(`Current balance: $${this.balance}`);
}
}

// Customer Class
class Customer{
    firtstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount)
    {
        this.firtstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account
    }
}

// Create Bank Accounts

const accounts: BankAccount[] = [
    new BankAccount (1001, 500),
    new BankAccount (1002, 1000),
    new BankAccount (1003, 2000)
];

// Create Customers
const customers: Customer[] = [
    new Customer ("Fatima", "Sheikh", "Female", 23, 3162223334, accounts[0]),
    new Customer ("Abdul Rehman", "Sheikh", "Male", 32, 3332223334, accounts[1]),
    new Customer ("Rabia", "Sheikh", "Female", 25, 3412223334, accounts[2])
]

// Function To Interact With Bank Account

async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        })

        const customer = customers.find(customer => customer.account.accounNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`Welcome, ${customer.firtstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
            name: "select",
            type: "list",
            Message: "Select an operation",
            choices: ["Deposit", "Withdraw", "Check Balance", "Exite"]
            }]);

            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    })
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    })
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank account program....");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
            }
            
        }else {
            console.log("Invalid account number. Please try again.");
        }
    } while(true)
}

service()