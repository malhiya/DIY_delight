import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getBag, deleteBag } from '../services/BagsAPI'
import '../css/BagDetails.css' 

const BagDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [bag, setBag] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBag = async () => {
      try {
        const data = await getBag(id)
        setBag(data)
      } catch (err) {
        setError('Failed to load bag details')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBag()
  }, [id])

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this bag?')) {
      try {
        await deleteBag(id)
        navigate('/bags')
      } catch (err) {
        alert('Failed to delete bag')
      }
    }
  }

  if (loading) return <div className="details-container"><p>Loading bag details...</p></div>
  if (error) return <div className="details-container"><p>{error}</p></div>
  if (!bag) return <div className="details-container"><p>Bag not found</p></div>

  return (
    <div className="details-container">
      <h2>Bag Details</h2>
      <p><strong>User Name:</strong> {bag.user_name}</p>
      <p><strong>Bag Type:</strong> {bag.bag_type}</p>
      <p><strong>Material:</strong> {bag.material}</p>
      <p>
        <strong>Color:</strong> {bag.color}
        <span 
          className="color-indicator" 
          style={{ backgroundColor: bag.color?.toLowerCase() }}
        ></span>
      </p>
      <p><strong>Design:</strong> {bag.design || 'None'}</p>
      <p><strong>Accessories:</strong> {bag.accessories || 'None'}</p>
      <p><strong>Total Price:</strong> ${bag.total_price}</p>
      <p><strong>Created At:</strong> {new Date(bag.created_at).toLocaleString()}</p>

      <div className="button-group">
        <Link to={`/bags/${bag.id}/edit`}>
          <button>Edit Bag</button>
        </Link>
        <button onClick={handleDelete} className="delete-btn">Delete Bag</button>
        <Link to="/bags">
          <button>Back to List</button>
        </Link>
      </div>
    </div>
  )
}

export default BagDetails