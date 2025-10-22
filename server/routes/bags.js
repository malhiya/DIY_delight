import express from 'express'
import BagsController from '../controllers/bags.js'

const router = express.Router()


router.get('/', BagsController.getBags)

router.get('/:id', BagsController.getBagById)

router.post('/', BagsController.createBag)

router.put('/:id', BagsController.updateBag)

router.delete('/:id', BagsController.deleteBag)

export default router
