const { Schema, model } = require("mongoose");

const proyectoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  descripcion: {
    type: String,
    required: [true, "La descripcion es obligatoria"],
  },
  estado: {
    type: String,
    required: [true, "El estado es obligatorio"],
  },
fechaInicio: {
    type: Date,
    default: Date.now,
  },
  fechaFin: {
    type: Date,
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
  },
 
  clientes: {
    type: Schema.Types.ObjectId,
    ref: 'clientes', 
    required: true
  },
  universidad: {
    type: Schema.Types.ObjectId,
    ref: 'universidad', 
    required: true
  },
  tipoProyecto: {
    type: Schema.Types.ObjectId,
    ref: 'TipoProyecto',
    required: true
  }
});

module.exports = model("Proyecto", proyectoSchema);

