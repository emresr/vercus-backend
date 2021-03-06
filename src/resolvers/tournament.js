function groups(parent, args, context) {
  return context.prisma.tournament
    .findUnique({ where: { id: parent.id } })
    .groups();
}

module.exports = {
  groups,
};
