import { areaSchema } from "../schemas/AreaSchema.mjs";
import AreaService from "../services/AreaService.mjs";

export default class AreaController {
  async create(req, res) {
    const data = areaSchema.parse(req.body);
    const area = await AreaService.create(data);
    res.status(201).send(area);
  }

  async list(req, res) {
    const areas = await AreaService.list();
    res.send(areas);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const area = await AreaService.findById(id);
    res.send(area);
  }

  async update(req, res) {
    const { id } = req.params;
    const data = areaSchema.parse(req.body);
    const updated = await AreaService.update(id, data);
    res.send(updated);
  }

  async delete(req, res) {
    const { id } = req.params;
    await AreaService.remove(id);
    res.send({ message: "Area deleted" });
  }
}
