import client from "../../libs/prismaClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    // console.log("id", id);
    const result = await client.Student.findUnique({
      select: {
        id: true,
        studentName: true,
        studentGrade: true,
        kor: true,
        eng: true,
        math: true,
        total: true,
        average: true,
      },
      where: {
        id: +id,
      },
    });
    // console.log("백엔드 조회 결과:", result);
    res.status(200).json(result);
  }

  if (req.method === "PATCH") {
    const {
      body: {
        data: {
          studentName,
          studentGrade: studentGrade,
          kor: korNumber,
          eng: engNumber,
          math: mathNumber,
        },
      },
    } = req;

    const result = await client.student.updateMany({
      data: {
        studentName,
        studentGrade,
        kor: korNumber,
        eng: engNumber,
        math: mathNumber,
      },
      where: {
        id: +id,
      },
    });
    res.status(200).json({ result });
  }
}
