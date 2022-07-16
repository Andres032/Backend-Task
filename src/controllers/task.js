const { response } = require('express');
const Tarea = require('../models/Tarea');


const getTask = async (req, res = response) => {

    const tareas = await Tarea.find()
        .populate('user', 'name');

    res.json({
        ok: true,
        tareas
    });
}

const crearTask = async (req, res = response) => {

    const tarea = new Tarea(req.body);

    try {

        tarea.user = req.uid;

        const tareaGuardada = await tarea.save();

        res.json({
            ok: true,
            tarea: tareaGuardada
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarEstado = async( req, res = response ) => {
    
    const tareaId = req.params.id;
    const uid = req.uid;

    try {

        const tarea = await Tarea.findById( tareaId );

        if ( !tarea ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe tarea por ese id'
            });
        }

        if ( tarea.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para cambiar el estado de esa tarea'
            });
        }

        const nuevaTarea = {
            ...req.body,
            user: uid
        }

        const estadoActualizado = await Tarea.findByIdAndUpdate( tareaId, nuevaTarea, { new: true } );

        res.json({
            ok: true,
            tarea: estadoActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getTask,
    crearTask,
    actualizarEstado

}