import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function CreateAgent() {
  const navigate = useNavigate();

  const handleCreateWorkflow = () => {
    const agentId = uuidv4();
    navigate(`/createworkflow?agent_id=${agentId}`);
  };

  return <button onClick={handleCreateWorkflow}>Add Workflow for Agent</button>;
}
