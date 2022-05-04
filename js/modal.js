'use strict'

const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
    document.getElementById('modal-form').reset()
    document.getElementById('nome').removeAttribute('data-id')
}

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('cancelar').addEventListener('click', closeModal)

export {openModal, closeModal}