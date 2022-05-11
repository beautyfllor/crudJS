'use strict'

const url = 'https://testeleonid.herokuapp.com/clientes'

const readCustomers = async (id='') => {
    //Ler a API - A variável response -> resposta do servidor
    const response = await fetch(`${url}/${id}`)
    return await response.json()
} 

const createCustomers = async(customer) => {
    const options = {
        'method': 'POST',
        //stringify(): Transforma o JSON em uma string
        'body': JSON.stringify(customer),
        'headers': {
            //content-type: Que tipo de arquivo estamos usando
            'content-type': 'application/json'
        }
    }

    const response = await fetch(url, options)
    console.log('CREATE', response.ok)
}

const deleteCustomer = async (codigo) => {
    const options = {
        'method': 'DELETE'
    }
    const response = await fetch(`${url}/${codigo}`, options)
}

const updateCustomer = async (customer) => {
    const options = {
        'method': 'PUT',
        'body': JSON.stringify(customer),
        'headers': {
            'content-type': 'application/json'
        }
    }
    const response = await fetch(`${url}/${customer.id}`, options)
    console.log('UPDATE', response.ok)
}

export {readCustomers, createCustomers, deleteCustomer, updateCustomer}