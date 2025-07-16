

const responseFormatter = (req, res, next) => {
  const oldJson = res.json;

  res.json = function (data) {
    // If it's already formatted (has success field), don't double-wrap
    if (data?.success === false || data?.success === true) {
      return oldJson.call(this, data);
    }

    const statusCode = this.statusCode < 400 ? this.statusCode : 200;

    return oldJson.call(this, {
      success: true,
      message: data?.message || 'Request successful',
      data,
    });
  };

  next();
};

export default responseFormatter;
