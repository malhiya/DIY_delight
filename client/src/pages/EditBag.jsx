import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getBag, updateBag } from '../services/BagsAPI'

const EditBag = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    user_name: '',
    bag_type: '',
    color: '',
    material: '',
    design: '',
    accessories: '',
    total_price: 0
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  useEffect(() => {
    const fetchBag = async () => {
      try {
        const data = await getBag(id)
        setFormData(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load bag')
        setLoading(false)
      }
    }
    fetchBag()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    
    const updatedFormData = {
      ...formData,
      [name]: value
    }


    const bagTypePrice =
      updatedFormData.bag_type === 'Backpack' ? 20 :
      updatedFormData.bag_type === 'Tote' ? 15 :
      updatedFormData.bag_type === 'Crossbody' ? 10 : 0

    const materialPrice =
      updatedFormData.material === 'Leather' ? 30 :
      updatedFormData.material === 'Canvas' ? 15 :
      updatedFormData.material === 'Recycled' ? 20 : 0

    const designPrice =
      updatedFormData.design === 'Printed' ? 10 :
      updatedFormData.design === 'Embroidered' ? 15 : 0

    const accessoriesPrice =
      updatedFormData.accessories === 'Charms' ? 5 :
      updatedFormData.accessories === 'Extra Pockets' ? 10 : 0

    const total = bagTypePrice + materialPrice + designPrice + accessoriesPrice

    setFormData({
      ...updatedFormData,
      total_price: total
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateBag(id, formData)
      navigate(`/bags/${id}`)
    } catch (err) {
      setError('Failed to update bag')
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="container">
      <h2>Edit Your Bag</h2>
      
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit} className="form">

        <label>
          Your Name:
          <input
            type="text"
            name="user_name"
            value={formData.user_name || ''}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Bag Type:
          <select name="bag_type" value={formData.bag_type || ''} onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="Backpack">Backpack</option>
            <option value="Tote">Tote</option>
            <option value="Crossbody">Crossbody</option>
          </select>
        </label>

        <label>
          Material:
          <select name="material" value={formData.material || ''} onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="Leather">Leather</option>
            <option value="Canvas">Canvas</option>
            <option value="Recycled">Recycled</option>
          </select>
        </label>

        <label>
          Color:
          <select name="color" value={formData.color || ''} onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="Black">Black</option>
            <option value="Red">Red</option>
            <option value="Navy">Navy</option>
            <option value="Tan">Tan</option>
            <option value="Olive">Olive</option>
            <option value="Brown">Brown</option>
          </select>
        </label>

        <label>
          Design:
          <select name="design" value={formData.design || ''} onChange={handleChange}>
            <option value="">None</option>
            <option value="Plain">Plain</option>
            <option value="Printed">Printed</option>
            <option value="Embroidered">Embroidered</option>
          </select>
        </label>

        <label>
          Accessories:
          <select name="accessories" value={formData.accessories || ''} onChange={handleChange}>
            <option value="">None</option>
            <option value="Charms">Charms</option>
            <option value="Extra Pockets">Extra Pockets</option>
          </select>
        </label>

        <p><strong>Total Price:</strong> ${formData.total_price}</p>

        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => navigate('/bags')}>Cancel</button>
      </form>
    </div>
  )
}

export default EditBag