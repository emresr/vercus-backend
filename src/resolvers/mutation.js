const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function signup(parent, args, context, info) {
  // 1
  const password = await bcrypt.hash(args.password, 10);

  // 2
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 4
  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  // 1
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 3
  return {
    token,
    user,
  };
}
async function updateUser(parent, args, context, info) {
  const updateUser = await context.prisma.user.update({
    where: {
      id: parseInt(args.id),
    },
    data: {
      email: args.email,
      name: args.name,
    },
  });
  return updateUser;
}

async function deleteUser(parent, args, context, info) {
  const deleteUser = await context.prisma.user.delete({
    where: {
      id: parseInt(args.id),
    },
  });
  return deleteUser;
}
// competator
async function createCompetator(parent, args, context, info) {
  const { userId } = context;

  return await context.prisma.competator.create({
    data: {
      group: { connect: { id: 1 } },
    },
  });
}

async function updateCompetator(parent, args, context, info) {
  return await context.prisma.competator.update({
    where: {
      id: 1,
    },
    data: {
      group: { connect: { id: 1 } },
      point: 13,
    },
  });
}

// group
async function createGroup(parent, args, context, info) {
  const { userId } = context;

  return await context.prisma.group.create({
    data: {
      tournament: { connect: { id: parseInt(args.tournamentId) } },
      name: args.name,
    },
  });
}
// tournament
async function createTournament(parent, args, context, info) {
  return await context.prisma.tournament.create({
    data: {
      title: args.title,
    },
  });
}

module.exports = {
  signup,
  login,
  updateUser,
  deleteUser,
  createGroup,
  createTournament,
  createCompetator,
  updateCompetator,
};
