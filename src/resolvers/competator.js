function group(parent, args, context) {
  return context.prisma.competator
    .findUnique({ where: { id: parent.id } })
    .group();
}
module.exports = {
  group,
};
