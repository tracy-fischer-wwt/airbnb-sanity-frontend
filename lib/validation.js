// Small, dependency-free helpers for validating API route input.

export class ValidationError extends Error {
  constructor(message, status = 400) {
    super(message)
    this.name = "ValidationError"
    this.status = status
  }
}

// Throws a 405 ValidationError (and sets the Allow header) unless the request
// method is one of `allowed`.
export const assertMethod = (req, res, allowed) => {
  if (!allowed.includes(req.method)) {
    res.setHeader("Allow", allowed)
    throw new ValidationError(`Method ${req.method} not allowed`, 405)
  }
}

// Reads a single string query parameter. Repeated parameters (arrays) are
// rejected. Returns `fallback` when the parameter is absent and not required.
export const getStringParam = (
  query,
  key,
  { required = false, minLength = 1, maxLength = 100, pattern, fallback } = {}
) => {
  const value = query[key]

  if (value === undefined || value === "") {
    if (required) throw new ValidationError(`Missing query parameter "${key}"`)
    return fallback
  }

  if (typeof value !== "string") {
    throw new ValidationError(`Query parameter "${key}" must be a single value`)
  }

  const trimmed = value.trim()
  if (trimmed.length < minLength || trimmed.length > maxLength) {
    throw new ValidationError(
      `Query parameter "${key}" must be between ${minLength} and ${maxLength} characters`
    )
  }
  if (pattern && !pattern.test(trimmed)) {
    throw new ValidationError(`Query parameter "${key}" has an invalid format`)
  }

  return trimmed
}

// Wraps a route handler so ValidationErrors become JSON error responses.
export const withValidation = (handler) => async (req, res) => {
  try {
    await handler(req, res)
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(error.status).json({ error: error.message })
    }
    throw error
  }
}
