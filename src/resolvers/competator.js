function user(parent, args, context) {
  return context.prisma.competator
    .findUnique({ where: { id: parent.id } })
    .user();
}

function group(parent, args, context) {
  return context.prisma.competator
    .findUnique({ where: { id: parent.id } })
    .group();
}
module.exports = {
  user,
  group,
};
