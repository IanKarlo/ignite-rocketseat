const { response } = require('express');
const express = require('express');

const { v4: uuidV4 } = require('uuid');

const app = express();

app.use(express.json());

// helpers functions

const getCustomerBalance = (statements) => {
  const balance =  statements.reduce((acc, operation) => {
    if(operation.type === 'credit') {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  },0);
  return balance;
}

// middlewares

const verifyIfExistsAccountByCpf = (req, res, next) => {
  const { cpf } = req.headers;

  const customer = customers.find(customer => {
    return customer.cpf === cpf
  });

  if(!customer) {
    return res.status(400).json({error: "Invalid cpf"});
  }

  req.customer = customer;

  return next();
}


//conta

/*
  Dados:

  id - uuid
  cpf - string
  name - string
  statement - []
*/

const customers = []

app.post('/account', (req, res) => {
  const { cpf, name } = req.body;
  const id = uuidV4();

  const customerAlreadyExists = customers.some(customer => customer.cpf === cpf);

  if(customerAlreadyExists) {
    return res.status(400).json({error: "Customer already exists!"});
  }

  customers.push({
    cpf,
    name,
    id,
    statement: []
  })

  return res.status(201).send();

});

app.get('/statement', verifyIfExistsAccountByCpf, (req, res) => {

  const customer = req.customer;

  return res.status(200).json({
    statement: customer.statement
  })
});

app.post('/deposit', verifyIfExistsAccountByCpf, (req, res) => {
  const { description, amount } = req.body;

  const { customer } = req;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit'
  }

  customer.statement.push(statementOperation);

  return res.status(201).send();

});

app.post('/withdraw', verifyIfExistsAccountByCpf, (req, res) => {
  const { amount } = req.body;

  const { customer } = req;

  const balance = getCustomerBalance(customer.statement);

  if(amount > balance) {
    return res.status(400).json({error: "Insufficient funds!"});
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: 'debit'
  }

  customer.statement.push(statementOperation)

  res.status(201).send();
})

app.get('/statement/date',verifyIfExistsAccountByCpf, (req, res) => {
  const { date } = req.query;

  const { customer } = req;

  const dateFormat = new Date(date + ' 00:00');

  const statement = customer.statement.filter(statement => statement.created_at.toDateString() === dateFormat.toDateString())

  res.json({
    statements: statement
  })

})

app.put('/account', verifyIfExistsAccountByCpf, (req, res) => {
  const { name } = req.body;
  const { customer } = req;

  customer.name = name;

  return res.status(201).send();
});

app.get('/account', verifyIfExistsAccountByCpf, (req, res) => {
  const { customer } = req;

  return res.json({customer});
})

app.delete('/account', verifyIfExistsAccountByCpf, (req, res) => {
  const { customer } = req;

  const customerIndex = customers.findIndex(e => e.id === customer.id);

  if(customerIndex === -1) {
    return res.status(500).json({error: "Internal server error"});
  }

  customers.splice(customerIndex, 1);

  return res.json({
    customers
  });
});

app.get('/account/balance', verifyIfExistsAccountByCpf, (req, res) => {
  const { customer } = req;

  const balance = getCustomerBalance(customer.statement);

  return res.json({
    balance
  })
});

app.listen(8080, () => {
  console.log("Server listen on port 8080");
})