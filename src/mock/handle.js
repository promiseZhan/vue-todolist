exports.handleError = ({ message = "请求失败", err = null }) => {
  return { code: 0, message, debug: err };
};
exports.handleSuccess = ({ message = "请求成功", result = null }) => {
  return { code: 1, message, result };
}