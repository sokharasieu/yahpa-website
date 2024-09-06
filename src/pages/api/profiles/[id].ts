import { getAuth } from '@clerk/nextjs/server'
import { ProfileModel } from 'models/Profile'
import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'utils/dbConnect'

export default async function profilesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId } = getAuth(req)
    await dbConnect()

    if (!userId) return res.status(401).json({ message: 'Unauthorized user' })

    if (!req.query.id)
      return res.status(400).json({ message: 'No ID provided' })

    switch (req.method) {
      case 'GET': {
        try {
          const profile = await ProfileModel.findById(req.query.id)

          if (!profile) {
            return res.status(400).json({ success: false })
          }

          res.status(200).json({ success: true, data: profile })
        } catch (error) {
          res.status(400).json({ success: false, error })
        }
        break
      }

      case 'PUT': {
        try {
          const profile = await ProfileModel.findByIdAndUpdate(
            req.query.id,
            req.body,
            {
              new: true,
              runValidators: true,
            }
          )

          if (!profile) {
            return res.status(400).json({ success: false })
          }

          return res.status(200).json({ success: true, data: profile })
        } catch (error) {
          res.status(400).json({ success: false, error })
        }
        break
      }

      case 'DELETE': {
        try {
          const deletedProfile = await ProfileModel.deleteOne({
            _id: req.query.id,
          })

          if (!deletedProfile) {
            return res.status(400).json({ success: false })
          }
          return res.status(200).json({ success: true, data: {} })
        } catch (error) {
          res.status(400).json({ success: false, error })
        }
        break
      }
      default:
        res.status(400).json({ success: false })
        break
    }
  } catch (e) {
    console.error(e)
  }
}
