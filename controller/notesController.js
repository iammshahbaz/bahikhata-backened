 const {NoteModule} = require("../model/noteModel")

const createNote = async(req,res)=>{
    try {
        const note = new NoteModule(req.body)
        await note.save();
        res.send({msg: "Note added Successfully"})
    } catch (error) {
        console.log(`Error in creating a note : ${error}`);
        res.send({error : "Error in creating note"})
    }
}

const getNotes = async (req, res) => {
    try {
      const notes = await NoteModule.find({ userId: req.body.userId });
      res.send({ notes });
    } catch (error) {
      console.log(`Error in getting all Notes : ${error}`);
      res.status(401).send({ error: "Error in fetching data!" });
    }
  };
  
  const updateNote = async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    try {
        const note = await NoteModule.findById(id);
        if(note.userId === req.body.userId){
      await NoteModule.findByIdAndUpdate({ _id: id }, req.body);
      return res.status(200).send({ msg: "Note update successfully " });
        }else{
            res.send({"msg":"you are not authorised"})
        }
    } catch (error) {
      return res.status(500).send({ msg: "Error updating Note", error: error });
      console.log(error);
    }
  };
  
  const deleteNote = async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    try {
        const note = await NoteModule.findById(id);
        if(note.userId === req.body.userId){
      await NoteModule.findByIdAndDelete({ _id: id }, req.body);
      return res.status(200).send({ msg: "Note deleted successfully " });
        }else{
            res.send({"msg":"you are not authorised"})
        }
    } catch (error) {
      return res.status(500).send({ msg: "Error deleting Note", error: error });
      console.log(error);
    }
  };
  
  module.exports = {
    createNote,
    getNotes,
    updateNote,
    deleteNote,
  };
  
