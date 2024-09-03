const owner = 'octocat';
const repo = 'Hello-World';
const token = 'YOUR_PERSONAL_ACCESS_TOKEN';

async function fetchCommitMessages() {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const commits = await response.json();
    
    commits.forEach(commit => {
      console.log(`Commit: ${commit.sha}`);
      console.log(`Message: ${commit.commit.message}`);
      console.log(`Author: ${commit.commit.author.name}`);
      console.log(`Date: ${commit.commit.author.date}`);
      console.log('---');
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchCommitMessages();