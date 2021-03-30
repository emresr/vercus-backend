function newCompetatorSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_COMPETATOR");
}

const newCompetator = {
  subscribe: newCompetatorSubscribe,
  resolve: (payload) => {
    return payload;
  },
};

module.exports = {
  newCompetator,
};
