export default {
  isNotShort: (value) => {
    if (value.length < 8) {
      throw new Error('password should be atleast 8 characters');
    }
  },
};
