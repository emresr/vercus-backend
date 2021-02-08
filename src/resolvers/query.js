async function users(parent, args, context, info) {
  const allUsers = await context.prisma.user.findMany();

  return allUsers;
}

async function user(parent, args, context, info) {
  return await context.prisma.user.findUnique({
    where: {
      id: parseInt(args.id),
    },
  });
}

module.exports = {
  users,
  user,
};
