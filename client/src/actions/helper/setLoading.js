export default {
    isLoading: (dispatch, actionTypes) => {
        return  dispatch({
        type: actionTypes.LOADING,
        isLoading: true,
      });
    },
    isNotLoading: (dispatch, actionTypes) => {
        return  dispatch({
        type: actionTypes.NOT_LOADING,
        isLoading: false,
      });
    }
}