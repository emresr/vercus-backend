function group(parent, args, context) {
  return context.prisma.competator
    .findUnique({ where: { id: parent.id } })
    .group();
}
function user(parent, args, context) {
  return context.prisma.competator
    .findUnique({ where: { id: parent.id } })
    .user();
}
function matchs(parent, args, context) {
  return context.prisma.competator
    .findUnique({ where: { id: parent.id } })
    .matchs();
}
module.exports = {
  group,
  user,
  matchs,
};
