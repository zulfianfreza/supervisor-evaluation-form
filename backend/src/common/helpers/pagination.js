const { IPagination } = require('../interface');

// eslint-disable-next-line no-unused-vars
const { data: IData, options: IOptions, response: IResponse } = IPagination;
/**
 * add meta data pagination
 * @param {IData} data
 * @param {IOptions} options
 * @returns {IResponse}
 */
const addPageMetadata = (data, options) => {
  const { count } = data;
  const { limit, page } = options;
  const currentPage = page;
  const perPage = limit;
  const totalItems = count;
  const totalPages = Math.ceil(count / limit);
  return {
    items: data.rows,
    meta: {
      currentPage,
      perPage,
      totalItems,
      totalPages,
    },
  };
};

module.exports = {
  addPageMetadata,
};
