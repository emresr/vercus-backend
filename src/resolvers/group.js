function competators(parent, args, context) {
  return context.prisma.group
    .findMany({ where: { id: parent.id } })
    .competators();
}

function tournament(parent, args, context) {
  return context.prisma.group
    .findUnique({ where: { id: parent.id } })
    .tournament();
}
module.exports = {
  competators,
  tournament,
};
