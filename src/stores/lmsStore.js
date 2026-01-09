// Local storage-based store for LMS data

const STORAGE_KEYS = {
  BATCHES: "lms_batches",
  CLASSES: "lms_classes",
  NOTES: "lms_notes",
  TESTS: "lms_tests",
  TEST_RESULTS: "lms_test_results",
  COMMENTS: "lms_comments",
  ENROLLMENTS: "lms_enrollments",
};

// Initialize with default data if empty
const initializeStore = () => {
  if (!localStorage.getItem(STORAGE_KEYS.BATCHES)) {
    localStorage.setItem(STORAGE_KEYS.BATCHES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CLASSES)) {
    localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTES)) {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TESTS)) {
    localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TEST_RESULTS)) {
    localStorage.setItem(STORAGE_KEYS.TEST_RESULTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.COMMENTS)) {
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ENROLLMENTS)) {
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify([]));
  }
};

initializeStore();

// Generic helpers
const getData = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Batches
export const getBatches = () => getData(STORAGE_KEYS.BATCHES);

export const getBatchById = (id) => getBatches().find((b) => b.id === id);

export const getTeacherBatches = (teacherId) =>
  getBatches().filter((b) => b.teacherId === teacherId);

export const createBatch = (batch) => {
  const batches = getBatches();
  const newBatch = {
    ...batch,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
  };
  batches.push(newBatch);
  setData(STORAGE_KEYS.BATCHES, batches);
  return newBatch;
};

export const updateBatch = (id, updates) => {
  const batches = getBatches();
  const index = batches.findIndex((b) => b.id === id);
  if (index !== -1) {
    batches[index] = { ...batches[index], ...updates };
    setData(STORAGE_KEYS.BATCHES, batches);
    return batches[index];
  }
  return null;
};

export const deleteBatch = (id) => {
  const batches = getBatches().filter((b) => b.id !== id);
  setData(STORAGE_KEYS.BATCHES, batches);
};

// Enrollments
export const getEnrollments = () => getData(STORAGE_KEYS.ENROLLMENTS);

export const getStudentEnrollments = (studentId) =>
  getEnrollments().filter((e) => e.studentId === studentId);

export const getBatchEnrollments = (batchId) =>
  getEnrollments().filter((e) => e.batchId === batchId);

export const isStudentEnrolled = (studentId, batchId) =>
  getEnrollments().some((e) => e.studentId === studentId && e.batchId === batchId);

export const enrollStudent = (studentId, batchId) => {
  if (isStudentEnrolled(studentId, batchId)) return null;
  const enrollments = getEnrollments();
  const enrollment = {
    id: Date.now().toString(),
    studentId,
    batchId,
    enrolledAt: new Date().toISOString(),
  };
  enrollments.push(enrollment);
  setData(STORAGE_KEYS.ENROLLMENTS, enrollments);
  return enrollment;
};

export const joinBatchByCode = (studentId, inviteCode) => {
  const batch = getBatches().find(
    (b) => b.inviteCode.toLowerCase() === inviteCode.toLowerCase()
  );
  if (!batch) return { success: false, error: "Invalid invite code" };
  if (isStudentEnrolled(studentId, batch.id)) {
    return { success: false, error: "Already enrolled in this batch" };
  }
  enrollStudent(studentId, batch.id);
  return { success: true, batch };
};

export const getEnrolledBatches = (studentId) => {
  const enrollments = getStudentEnrollments(studentId);
  const batches = getBatches();
  return enrollments.map((e) => batches.find((b) => b.id === e.batchId)).filter(Boolean);
};

// Classes
export const getClasses = () => getData(STORAGE_KEYS.CLASSES);

export const getClassById = (id) => getClasses().find((c) => c.id === id);

export const getBatchClasses = (batchId) =>
  getClasses()
    .filter((c) => c.batchId === batchId)
    .sort((a, b) => a.order - b.order);

export const createClass = (classData) => {
  const classes = getClasses();
  const batchClasses = classes.filter((c) => c.batchId === classData.batchId);
  const newClass = {
    ...classData,
    id: Date.now().toString(),
    order: batchClasses.length + 1,
    createdAt: new Date().toISOString(),
  };
  classes.push(newClass);
  setData(STORAGE_KEYS.CLASSES, classes);
  return newClass;
};

export const updateClass = (id, updates) => {
  const classes = getClasses();
  const index = classes.findIndex((c) => c.id === id);
  if (index !== -1) {
    classes[index] = { ...classes[index], ...updates };
    setData(STORAGE_KEYS.CLASSES, classes);
    return classes[index];
  }
  return null;
};

export const deleteClass = (id) => {
  const classes = getClasses().filter((c) => c.id !== id);
  setData(STORAGE_KEYS.CLASSES, classes);
};

// Notes
export const getNotes = () => getData(STORAGE_KEYS.NOTES);

export const getClassNotes = (classId) =>
  getNotes().filter((n) => n.classId === classId);

export const createNote = (note) => {
  const notes = getNotes();
  const newNote = {
    ...note,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  notes.push(newNote);
  setData(STORAGE_KEYS.NOTES, notes);
  return newNote;
};

export const deleteNote = (id) => {
  const notes = getNotes().filter((n) => n.id !== id);
  setData(STORAGE_KEYS.NOTES, notes);
};

// Tests
export const getTests = () => getData(STORAGE_KEYS.TESTS);

export const getTestById = (id) => getTests().find((t) => t.id === id);

export const getBatchTests = (batchId) =>
  getTests().filter((t) => t.batchId === batchId);

export const createTest = (test) => {
  const tests = getTests();
  const newTest = {
    ...test,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  tests.push(newTest);
  setData(STORAGE_KEYS.TESTS, tests);
  return newTest;
};

export const deleteTest = (id) => {
  const tests = getTests().filter((t) => t.id !== id);
  setData(STORAGE_KEYS.TESTS, tests);
};

// Test Results
export const getTestResults = () => getData(STORAGE_KEYS.TEST_RESULTS);

export const getStudentTestResult = (studentId, testId) =>
  getTestResults().find((r) => r.studentId === studentId && r.testId === testId);

export const getTestResultsByTest = (testId) =>
  getTestResults().filter((r) => r.testId === testId);

export const submitTestResult = (result) => {
  const results = getTestResults();
  const existing = results.findIndex(
    (r) => r.studentId === result.studentId && r.testId === result.testId
  );
  
  const newResult = {
    ...result,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
  };
  
  if (existing !== -1) {
    results[existing] = newResult;
  } else {
    results.push(newResult);
  }
  
  setData(STORAGE_KEYS.TEST_RESULTS, results);
  return newResult;
};

// Comments (for live classes)
export const getComments = () => getData(STORAGE_KEYS.COMMENTS);

export const getClassComments = (classId) =>
  getComments()
    .filter((c) => c.classId === classId)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

export const addComment = (comment) => {
  const comments = getComments();
  const newComment = {
    ...comment,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
  };
  comments.push(newComment);
  setData(STORAGE_KEYS.COMMENTS, comments);
  return newComment;
};

export const deleteComment = (id) => {
  const comments = getComments().filter((c) => c.id !== id);
  setData(STORAGE_KEYS.COMMENTS, comments);
};

// Get all live classes
export const getAllLiveClasses = () =>
  getClasses().filter((c) => c.type === "live");

// Get all recorded classes
export const getAllRecordedClasses = () =>
  getClasses().filter((c) => c.type === "recorded");

// Get all notes across all classes
export const getAllNotes = () => getNotes();
