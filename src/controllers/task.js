const { response } = require('express');
const Tarea = require('../models/Tarea');

const getTask = async( req, res = response ) => {

    const tareas= await Monitoria.find()
                                .populate('user','name');

    res.json({
        ok: true,
        tareas
    });
}

const crearTask = async ( req, res = response ) => {

    const tarea = new Tarea( req.body );

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



module.exports = {
    getTask,
    crearTask,
   
}