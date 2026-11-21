export const validateHealthQuery = (req) => {
  const errors = [];
  const { detail } = req.query;

  if (detail !== undefined && detail !== 'true' && detail !== 'false') {
    errors.push('Query parameter "detail" must be "true" or "false"');
  }

  return errors;
};
