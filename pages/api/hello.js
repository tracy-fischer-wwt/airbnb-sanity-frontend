// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  assertMethod,
  getStringParam,
  withValidation,
} from "../../lib/validation"

// GET /api/hello[?name=<letters, spaces, ' or - ; max 50 chars>]
const handler = (req, res) => {
  assertMethod(req, res, ["GET"])

  const name = getStringParam(req.query, "name", {
    maxLength: 50,
    pattern: /^[\p{L}][\p{L}\s'-]*$/u,
    fallback: "John Doe",
  })

  res.status(200).json({ name })
}

export default withValidation(handler)
