const BASE_URL = '/api/bags'


export async function getBags() {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error('Failed to fetch bags')
  return res.json()
}


export async function getBag(id) {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) throw new Error('Failed to fetch bag')
  return res.json()
}

export async function createBag(bagData) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bagData),
  })
  if (!res.ok) throw new Error('Failed to create bag')
  return res.json()
}

export async function updateBag(id, bagData) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bagData),
  })
  if (!res.ok) throw new Error('Failed to update bag')
  return res.json()
}


export async function deleteBag(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete bag')
  return res.json()
}
// import { getAllBags, createBag, updateBag, deleteBag } from '../services/BagsAPI'
