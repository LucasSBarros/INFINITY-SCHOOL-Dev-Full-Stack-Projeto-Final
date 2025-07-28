import { resourceSchema } from "../schemas/ResourceSchema.mjs";
import ResourceService from "../services/ResourceService.mjs";

export default class ResourceController {
  async create(req, res) {
    const data = resourceSchema.parse(req.body);
    const created = await ResourceService.create(data);
    res.status(201).send(created);
  }

  async list(req, res) {
    const resources = await ResourceService.list();
    res.send(resources);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const resource = await ResourceService.findById(id);
    res.send(resource);
  }

  async update(req, res) {
    const { id } = req.params;
    const data = resourceSchema.parse(req.body);
    const updated = await ResourceService.update(id, data);
    res.send(updated);
  }

  async delete(req, res) {
    const { id } = req.params;
    await ResourceService.remove(id);
    res.send({ message: "Resource deleted" });
  }
}
