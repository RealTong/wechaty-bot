import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function getAuthById(id: number) {
  return prisma.auth.findUnique({
    where: {
      id: id
    }
  })
}

/**
 * 查找token是否存在
 * @param token
 * @return true 存在 false 不存在
 */
function findTokenIsExist(token: string) {
  return prisma.auth.findMany({
    where: {
      token: token
    }
  }).then((result) => {
    console.log("result",result)
    return result.length > 0
  })
}

export {getAuthById, findTokenIsExist}