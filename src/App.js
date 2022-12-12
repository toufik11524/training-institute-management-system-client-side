import './App.css';
import Footer from './shared/Footer/Footer';
import Header from './shared/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Course from './pages/AdminDashBoard/Course/Courses';
import Topic from './pages/AdminDashBoard/Topic';
import Topics from './pages/AdminDashBoard/Topic/Topics';
import AddBatch from './pages/AdminDashBoard/AddBatch';
import AddCourse from './pages/AdminDashBoard/AddCourse';
import AddTopic from './pages/AdminDashBoard/AddTopic';
import AddTrainer from './pages/AdminDashBoard/AddTrainer';
import AddTrainee from './pages/AdminDashBoard/AddTrainee';
import SignIn from './pages/SignIn/SignIn';
import NotFound from './pages/NotFound/NotFound';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Courses from './pages/Courses/Courses';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Batches from './pages/AdminDashBoard/Batch/Batches';
import SingleBatch from './pages/AdminDashBoard/SingleBatch/SingleBatch';
import Trainees from './pages/AdminDashBoard/Trainee/Trainees';
import Trainers from './pages/AdminDashBoard/Trainers/Trainers';
import UpdateTrainee from './pages/AdminDashBoard/Trainee/UpdateTrainee';
import UpdateCourse from './pages/AdminDashBoard/Course/UpdateCourse';
import UpdateTopic from './pages/AdminDashBoard/Topic/UpdateTopic';
import SingleCourse from './pages/AdminDashBoard/SingleCourse/SingleCourse';
import Trainer from './pages/AdminDashBoard/Trainers/Trainer';
import UpdateTrainer from './pages/AdminDashBoard/Trainers/UpdateTrainer';
import SingleTrainer from './pages/AdminDashBoard/SingleTrainer/SingleTrainer';
import TrainingHistory from './pages/TrainingHistory/TrainingHistory';
import Previous from './pages/TrainingHistory/Previous/Previous';
import Ongoing from './pages/TrainingHistory/Ongoing/Ongoing';
import Upcoming from './pages/TrainingHistory/Upcoming/Upcoming';
import Tasks from './pages/TrainerDashBoard/Task/Tasks';
import AddTask from './pages/TrainerDashBoard/AddTask';
import SingleTask from './pages/TrainerDashBoard/SingleTask/SingleTask';
import TraineeTasks from './pages/TraineeDashBoard/TraineeTasks/TraineeTasks';
import TraineeMarksView from './pages/TraineeDashBoard/TraineeMarksView/TraineeMarksView';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';

function App() {
  const notify = (message) => toast(message);

  return (
    <div className='App'>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="dashboard" element={<Dashboard />}>
          {/* Trainer Routes */}
          <Route path='traineeTask' element={<TraineeTasks />} />
          <Route path='viewTraineMarks/:taskId' element={<TraineeMarksView />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="viewBatch/:batchId" element={<SingleBatch notify={notify} />} />
          <Route path="batch" element={<Batches />} />
          <Route path="course" element={<Course notify={notify} />} />
          <Route path="topic" element={<Topics notify={notify} />} />
          <Route path="trainer" element={<Trainers notify={notify} />} />
          <Route path="trainer" element={<Trainer notify={notify} />} />
          <Route path="trainee" element={<Trainees notify={notify} />} />
          <Route path="topic" element={<Topic />} /> 
          <Route path="addTask" element={<AddTask notify={notify} />} /> 
          <Route path="addBatch" element={<AddBatch notify={notify} />} /> 
          <Route path="addCourse" element={<AddCourse notify={notify} />} /> 
          <Route path="addTopic" element={<AddTopic notify={notify} />} /> 
          <Route path="addTrainer" element={<AddTrainer notify={notify} />} /> 
          <Route path="addTrainee" element={<AddTrainee notify={notify} />} /> 
          <Route path='viewTask/:taskId' element={<SingleTask notify={notify} /> } />
          <Route path="updateTrainee/:traineeId" element={<UpdateTrainee notify={notify} />} /> 
          <Route path="updateCourse/:courseId" element={<UpdateCourse notify={notify} />} /> 
          <Route path="viewCourse/:courseId" element={<SingleCourse notify={notify} />} /> 
          <Route path="updateTopic/:topicId" element={<UpdateTopic notify={notify} />} />
          <Route path="updateTrainer/:trainerId" element={<UpdateTrainer notify={notify} />} />
          <Route path="viewTrainer/:trainerId" element={<SingleTrainer notify={notify} />} /> 
        </Route>
        <Route path='trainingHistory' element={<TrainingHistory />} >
          <Route path="previous" element={<Previous />} />
          <Route path="ongoing" element={<Ongoing />} />
          <Route path="upcoming" element={<Upcoming />} />
        </Route>
        <Route path="signIn" element={<SignIn notify={notify} />} /> 
        <Route path="/forget-password" element={<ForgetPassword notify={notify}/>} />
        <Route path="/reset-password/:token/:userId" element={<ResetPassword notify={notify} />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
