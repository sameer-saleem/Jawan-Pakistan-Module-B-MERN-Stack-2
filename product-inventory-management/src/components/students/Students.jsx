import { Box, Button, FormControl, FormLabel, TextField, Typography } from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ref, push, get } from 'firebase/database';
import { db } from '../firebase/firebase';

const Students = () => {

    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState([]); 

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        class: '',
        gender: ''
    });


    const handleStudentData = async (e) => {
        e?.preventDefault();

        try {

            const studentsRef = ref(db, 'studentsList');

            await push(studentsRef, formData);

            setFormData({ fullname: '', email: '', class: '', gender: '' });

            handleClose();

            fetchStudents();

        } catch (error) {
            alert('Error saving student: ' + (error?.message || error));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchStudents = async () => {

        const snapshot = await get(ref(db, 'studentsList'));

        const studentsList = snapshot.val() || {};

        const studentsArray = Object.keys(studentsList).map(key => ({
            ...studentsList[key],
            id: key
        }));

        setRows(studentsArray);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <>
            <Box sx={{ width: 'calc(100% - 240px)', ml: 'auto', p: 2, height: 'calc(100vh - 65px)' }}>
                <Typography variant="h1" sx={{ fontSize: '1.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    Students List <Button variant="contained" onClick={handleClickOpen}>Add Student</Button>
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ border: '1px solid #ccc' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold'}}>Name</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}}>Email</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}}>Class</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}}>Gender</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, ii) => (
                                <TableRow
                                    key={ii}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        {row.fullname}
                                    </TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.class}</TableCell>
                                    <TableCell>{row.gender}</TableCell>    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add Student"}
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '400px',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="fullname">Full name</FormLabel>
                            <TextField
                                id="fullname"
                                type="text"
                                name="fullname"
                                placeholder="John Doe"
                                autoComplete="fullname"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                value={formData.fullname}
                                onChange={(e) => handleChange(e)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                id="email"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                required
                                fullWidth
                                variant="outlined"
                                value={formData.email}
                                onChange={(e) => handleChange(e)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="class">Class</FormLabel>
                            <TextField
                                id="class"
                                type="text"
                                name="class"
                                placeholder=""
                                required
                                fullWidth
                                variant="outlined"
                                value={formData.class}
                                onChange={(e) => handleChange(e)}
                            />
                        </FormControl>


                        <FormControl>
                            <FormLabel id="gender">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="gender"
                                value={formData.gender}
                                name="gender"
                                onChange={(e) => handleChange(e)}
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </FormControl>


                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        fullWidth
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleStudentData}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Students