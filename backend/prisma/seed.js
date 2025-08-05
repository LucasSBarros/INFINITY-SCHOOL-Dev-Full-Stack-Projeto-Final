const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const hash = (pwd) => bcrypt.hashSync(pwd, 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Bruce Wayne",
        email: "bruce@wayne.com",
        password: hash("batman123"),
        role: "administrador",
      },
      {
        name: "Lucius Fox",
        email: "lucius@wayne.com",
        password: hash("wayne123"),
        role: "gerente",
      },
      {
        name: "Dick Grayson",
        email: "dick@wayne.com",
        password: hash("robin123"),
        role: "funcionario",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.area.createMany({
    data: [
      {
        name: "Recepção",
        description: "Entrada e recepção de visitantes",
        accessLevel: 1,
      },
      { name: "Escritório", description: "Administração", accessLevel: 1 },
      {
        name: "I&D",
        description: "Pesquisa e Desenvolvimento",
        accessLevel: 3,
      },
      {
        name: "Laboratório Wayne",
        description: "Protótipos e testes",
        accessLevel: 3,
      },
      {
        name: "Batcaverna",
        description: "Instalação altamente restrita",
        accessLevel: 5,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.resource.createMany({
    data: [
      {
        name: "Batmóvel",
        type: "veiculo",
        status: "ativo",
        location: "Batcaverna",
        description: "Veículo principal",
      },
      {
        name: "Batcomputador",
        type: "equipamento",
        status: "ativo",
        location: "Batcaverna",
        description: "Sistema central",
      },
      {
        name: "Scanner de Segurança",
        type: "dispositivoDeSeguranca",
        status: "ativo",
        location: "Recepção",
        description: "Controle de entrada",
      },
      {
        name: "Impressora 3D",
        type: "equipamento",
        status: "manutencao",
        location: "Laboratório Wayne",
        description: "Prototipagem rápida",
      },
      {
        name: "Carro de Suprimentos",
        type: "veiculo",
        status: "inativo",
        location: "Escritório",
        description: "Suprimentos internos",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed concluída com sucesso.");
}

main()
  .catch((e) => {
    console.error("Seed falhou:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
