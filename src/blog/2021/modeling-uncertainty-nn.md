---
path: "/blog/2021-modeling-uncertainty-in-neural-networks"
date: "2021-03-02"
title: "Modeling Uncertainty in Neural Networks"
---


This article is a personal summary of [Y. Gal's  MLSS 2019 Moscow, Bayesian Deep Learning (Slide Deck 2)](http://www.cs.ox.ac.uk/people/yarin.gal/website/bdl101/MLSS_2019_BDL_2.pdf).


## Background

Consider a dataset $\mathcal D = \{ (\mathbf x_i, y_i)\}_{i=1}^n$  where $\mathbf x \in \mathcal X \subseteq \reals^d$ and $y \in \mathcal Y$. Consider the underlying data generation process $f : \mathcal X \rightarrow \mathcal Y$ has the following form


$$
f (\mathbf x) = \mathbf w^T \phi(\mathbf x),
$$


where $\phi: \mathcal X \rightarrow \reals^h$ is a feature extractor that is assumed to be given. Consider regression problems, i.e. $\mathcal Y \subseteq \Reals$, we assume that the observed target is corrupted by noise $\epsilon$ . That is 


$$
y = f(\mathbf x) + \epsilon,
$$


where $\epsilon \sim \mathcal N(0, \sigma^2)$. In other words, $p(y|\mathbf x, \mathbf w) = \mathcal {N} (\mathbf w^T\phi(\mathbf x), \sigma^2)$.  Let define $\mathbf X = (\mathbf x_1, \dots, \mathbf x_n)^T$ and $\mathbf y = (y_1, \dots, y_n)^T$. Using Bayes' rule, we have 


$$
\begin{aligned}
p(\mathbf w | \mathcal D ) & \propto p( \mathbf y | \mathbf X, \mathbf w) p(\mathbf w) \\
& \propto \bigg(\prod_{i=1}^n p(y_i| \mathbf x_i, \mathbf w \bigg) p(\mathbf w).
\end{aligned}
$$


If we choose $p(\mathbf w) = \mathcal N(0, \sigma_w^2I_h)$. This setup leads to ridge regression, and the predictive distribution has a Gaussian form. 

Let's consider a $K$-category classification problem, i.e. $\mathcal Y = \{0, 1\}^K$ and assume the underlying data generation process is 


$$
f_W(\mathbf x) = \text{softmax}(W \phi(\mathbf x)),
$$


where $W \in \reals^{K \times h}$ and $\text{softmax}: \reals^K \rightarrow [0, 1]^K$ whose exact form is 


$$
(\text{softmax}(\mathbf a))_k = \frac{\exp( f_W^{k}(\mathbf x))}{\sum_{k'=1}^K \exp(f_W^{k'}(\mathbf x))}.
$$


Define $\mathbf Y = (\mathbf y_1, \dots, \mathbf y_n)^T$. Therefore, we can write the likelihood as 


$$
p(\mathbf Y| \mathbf X,\mathbf w) = \prod_{i=1}^n \mathbf y_i^T f_W(\mathbf x).
$$


However, in this classification setting and the assumption of the prior remains Gaussian, the posterior cannot be found because the evidence becomes intractable:


$$
\begin{aligned}
p(\mathbf Y| \mathbf X) &= \int p(\mathbf Y| \mathbf X,\mathbf w) p(\mathbf w) d\mathbf w \\
&= \int \bigg( \prod_{i=1}^n \mathbf y_i^T f_W(\mathbf x_i) \bigg) p(\mathbf w) d\mathbf w.
\end{aligned}
$$


In other words, the category distribution (the output of the softmax function) is not conjugate with the Gaussian prior. 

## Approximating the Posterior : Variational Inference

Instead of computing $p(W|\mathcal D)$ directly, we approxiate it using a variational distribution $q_\theta(W)$. Typically, we use a simple distribution like Gaussian for $q_\theta$; in this case, $\theta = \{ \mu_\text{VI}, \Sigma_\text{VI}\}$.  We can then find $\theta$  by minimizing the reverse Kullback-Leibler divergence 


$$
\min_\theta \text{KL}(q_\theta(W) \| p(W|\mathbf X, \mathbf Y)).
$$


Expanding the KL, we get 


$$
\begin{aligned}
\text{KL}(q_\theta(W) \| p(W|\mathbf X, \mathbf Y))  & = \int q_\theta(W) \log \frac{q_\theta(W)}{p(W | \mathbf X, \mathbf Y)} d W \\ 
& = \int q_\theta(W) \log \frac{q_\theta(W)p(\mathbf Y | \mathbf X)}{p(\mathbf Y| \mathbf X, W)p(W)} d W \\ 
&= \log p(\mathbf Y | \mathbf X) + \text{KL}(q_\theta(W) \| p(W)) - \mathbb{E}_{q_\theta(W)}\bigg[ \log p(\mathbf Y | \mathbf X, W) \bigg].
\end{aligned}
$$


Thus, we have 


$$
\begin{aligned}
\log p(\mathbf Y | \mathbf X)  &=     \mathbb{E}_{q_\theta(W)}\bigg[ \log p(\mathbf Y | \mathbf X, W) \bigg] - \text{KL}(q_\theta(W) \| p(W)) + \text{KL}(q_\theta(W) \| p(W|\mathbf X, \mathbf Y)) \\
&\ge \underbrace{    \mathbb{E}_{q_\theta(W)}\bigg[ \log p(\mathbf Y | \mathbf X, W) \bigg] - \text{KL}(q_\theta(W) \| p(W)),}_{\mathcal L_\text{ELBO}}
\end{aligned}
$$


where the first term corresponds to how we predict the data, and the second term is how well our approximated distribution aligns with the prior.

## Stochastic Approximate Inference

Let's consider the individual likelihood in classification settings; the log likelihood is


$$
\log p(y=c_k| \mathbf x, W) = f_W^{k}(\mathbf x) - \log \bigg(\sum_{k'} \exp(f_W^{k'}(\mathbf x))\bigg).
$$


Then, we have


$$
\begin{aligned}
\mathcal L_\text{ELBO} = \bigg(\frac{1}{n} \sum_{i=1}^n \int \bigg[ f_W^{k}(\mathbf x_i)_{y_i} - \log \bigg(\sum_{k'} \exp(f_W^{k'}(\mathbf x_i))\bigg)\bigg]   q_\theta(W)   dW \bigg)  - \text{KL}(q_\theta(W) \| p(W)),
\end{aligned}
$$


which is not integratable. 

### Detour: Monte Carlo Estimation and Re-parameterization Trick

Consider a density model $p(x)$ and a function of interest $f: \mathcal X \rightarrow \reals$. We assume that $x \sim p(x)$  can be done easily and assume that  $\mathbb E[ f(X)]$ is difficult to compute (no analytical solution). Instead, one can sample $x_i \sim p(x)$ for $i = [1, n]$  and compute 


$$
 \mathbb{\hat{E}} [ f(X)] = \frac{1}{n} \sum_{i=1}^n f(x_i).
$$


It can be shown that  $\mathbb{\hat{E}} [ f(X)]$ is an unbiased estimator, i.e. 


$$
\lim_{n \rightarrow \infty}  \mathbb{\hat{E}} [ f(X)] =  \mathbb{{E}} [ f(X)].
$$


Let's assume $w \sim \mathcal N(\mu, \sigma^2)$ and  consider  the following function


$$
\mathcal L(\mu, \sigma) = \int (w+w^2) \frac{1}{\sigma \sqrt{2 \pi } } \exp\bigg( - \frac{(w - \mu)^2}{2\sigma^2}\bigg) dw,
$$


which has a closed-form solution ([Link to derivation](https://www.integral-calculator.com/#expr=%28w%20%2B%20w%5E2%29%20e%5E%28-%28w-mu%29%5E2%2F%282sigma%5E2%29%29%20%2F%20%28sigma%20%2A%20sqrt%282%2Api%29%29%20&intvar=w&lbound=minf&ubound=inf)):


$$
\mathcal L(\mu, \sigma) =   \sigma^2 + \mu + \mu^2.
$$


We can see that  $\frac{\partial \mathcal L }{\partial \mu } = 1 + 2 \mu$ and $\frac{\partial \mathcal L }{\partial \sigma } = 2 \sigma$.

However, if we take $\hat w \sim \mathcal N(\mu, \sigma^2)$ and compute the derivatives, we get $\frac{ \partial  }{\partial \mu }  (\hat w + \hat w^2) = \frac{ \partial  }{\partial \sigma }  (\hat w + \hat w^2) = 0$. This is because the dependency of $\mu$  and $\sigma$ is via $w$.  

Instead, we can re-parameterize $\hat w$ using 


$$
\hat w = \mu + \sigma \epsilon,
$$


where $\epsilon \sim \mathcal N(0, 1)$. Thus, we have 


$$
\begin{aligned}
\mathcal{ \hat L}(\mu, \sigma) &= \hat w + \hat w^2 \\
&= (\mu + \sigma \epsilon) + (\mu + \sigma \epsilon)^2.
\end{aligned}
$$


We can see that 


$$
\begin{aligned}
\mathbb{E}_{p(\epsilon)}\bigg [ \frac{\partial \hat \mathcal L  }{\partial  \mu } \bigg] &= 1 + 2(\mu + \cancel{\sigma\mathbb{E}_{p(\epsilon)} [\epsilon])} \\
&= 1 + 2\mu \\ 
\mathbb{E}_{p(\epsilon)}\bigg [ \frac{\partial \hat \mathcal L  }{\partial  \sigma } \bigg] &= \mathbb{E}_{p(\epsilon)} [\epsilon + 2 (\mu + \sigma \epsilon) (\epsilon) ] \\
&=  \cancel{2\mu \mathbb{E}_{p(\epsilon)} [\epsilon ] }+ 2 \sigma \underbrace{\mathbb{E}_{p(\epsilon)} [\epsilon^2 ]}_{=1} \\
&= 2 \sigma,
\end{aligned}
$$


which are unbiased estimators of what we have derived previously. This trick is also known as pathwise derivative estimator, infinitesimal perturbation analysis, and stochastic backpropagation.

### Approximating the Posterior with Stochastic Variational Inference

With the re-parameterization trick, we can then construct an objective function to learn $q_\theta(W)$ with $\theta = \{ \mu_\text{VI}, \Sigma_\text{VI} \}$. We assume $\epsilon \sim \mathcal {N}(0,  I_{Kh})$ and  $q_\theta = \mathcal N(\mu_\text{VI}, \Sigma_\text{VI})$ where

- $\mu \in \reals^{Kh}$ and
- $\Sigma_\text{VI} = \text{diag}(\sigma_{\text{VI}_1}^2, \dots, \sigma_{\text{VI}_{Kh}}^2) \in \reals^{Kh\times Kh}$.

In other words, we have $\hat W  = \mu_\text{VI} + \Sigma_{\text{VI}}^{1/2} \epsilon$. Therefore,  our learning objective is


$$
\begin{aligned}
\mathcal{\hat{L}}_\text{ELBO} = \bigg(\frac{1}{n} \sum_{i=1}^n \int \bigg[ f_W^{k, \epsilon}(\mathbf x_i)_{y_i} - \log \bigg(\sum_{k'} \exp(f_W^{k',\epsilon}(\mathbf x_i))\bigg)\bigg]   q_\theta(W)   dW \bigg)  - \text{KL}(q_\theta(W) \| p(W)),
\end{aligned}
$$


whose $\mathbb {E}_{p(\epsilon)}[ \mathcal{\hat{L}}_\text{ELBO}  ] = \mathcal{{L}}_\text{ELBO}$  and $\mathbb {E}_{p(\epsilon)}[ \nabla_\theta \mathcal{\hat{L}}_\text{ELBO}  ] = \nabla_\theta \mathcal{{L}}_\text{ELBO}$ .

## Uncertainty in Classification

For a multinomial distribution  with $K$ classes whose mass is $p_{c_k}$ for $k \in [1, K]$, the uncertainty of the distribution is indicated by the entropy $H$


$$
H(\{p_{c_k}\}_k) = - \sum_{k=1}^K p_{c_k} \log p_{c_k}.
$$


One observation is that the entropy is highest when $p_c = p_{c'} \forall c, c' \in [1, K]$. In other words, this is the case when we have a uniform distribution over $K$ classes, indicating absolute ambiguity in the prediction. Noting that, here we use the natural logarithm; hence, $H$ is measured the unit of `nats`.

Because the output of neural networks for classification is a parameterized multinomial distribution, we can use the entropy as a measure of uncertainty, this is known as **predictive entropy**


$$
H_{p(y_*|\mathbf x_*, \mathcal D)}[Y_*] = -\sum_{k=1}^K p(y_*=c_k|\mathbf x_*, \mathcal D) 
 \log p(y_*=c_k|\mathbf x_*, \mathcal D),
$$


where $p(y_*=c_k|\mathbf x_*, \mathcal D)$ can be approximated using Monte Carlo. More precisely, let $\hat W_t \sim q_\theta(W)$ for $t=[1, T]$, we have


$$
p(y_*=c_k|\mathbf x_*, \mathcal D) \approx \frac{1}{T} \sum_{t=1}^T \text{softmax}(f_{\hat W_t}(\mathbf x_*)) _k.
$$


Because the ambiguity comes from two sources: 1) noisy measurements  and 2) model parameters, the predictive entropy captures both aleatoric and epistemic uncertainties.  To compute the epistemic uncertainty, we can look at the mutual information between the predicted label and the weights


$$
I[Y_* ; W] = H_{p(y_*| \mathbf x_*, \mathcal D)}[Y_*] - {  \color{blue} \mathbb E_{p(W|\mathcal D)}\big[ H_{p(y_*| \mathbf x_*, W)}[Y_*]\big] } ,
$$


where the first term is the predictive entropy and the second term is the average uncertainty of the prediction w.r.t the posterior. In other words, the second term captures the epistemic uncertainty, and it can be computed by


$$
\begin{aligned}
\mathbb E_{p(W|\mathcal D)}\big[ H_{p(y_*| \mathbf x_*, W)}[Y_*]\big] &=  \int p(W|\mathcal D) H_{p(y_*| \mathbf x_*, W)}[Y_*] dW \\
&\approx \frac{1}{T} \sum_{t=1}^T H_{p(y_*| \mathbf x_*, \hat W_t)}[Y_*] \\
&\approx - \frac{1}{T} \sum_{t=1}^T \sum_{k=1}^K \text{softmax}(f_{\hat W_t}(\mathbf x_*)) _k \log \text{softmax}(f_{\hat W_t}(\mathbf x_*)) _k \\

\end{aligned}
$$


where $\hat W_t \sim q_\theta(W)$. Moreover, because entropy is  non-negative, we have the following condition


$$
0 \le I[Y_*; W] \le H[Y_*].
$$


## Stochastic Approximate  Inference in Neural Networks

From the previous example, we only consider the posterior for the last layer; however, we can use the variational approach to  relax this constraint by considering the following model


$$
f(\mathbf x)  = W^2\sigma(W^1 \mathbf x + b¹)  + b^2,
$$


where $W^1  \in \reals^{h \times d}, W^2  \in \reals^{K \times h}$, $b^1 \in \reals^h, b^2 \in \reals^K$ .  We then assume that $w_{ij}^1, w_{ij}^2 \sim \mathcal N(0, 1)$. Define $\mathbf W = \{ W^{1}, W^{2}\}$. We thus have


$$
\begin{aligned}
\text{KL}(q_\theta \| p) &= \int q_\theta(\mathbf W) \log \frac{q_\theta(\mathbf W)}{p(\mathbf W)}   d\mathbf W \\
&\overset{(1)}{=} \int q_{\theta_{W^1}}(W^1) q_{\theta_{W^2}}(W^2)  \log \frac{q_{\theta_{W^1}}(W^1) q_{\theta_{W^2}}(W^2)}{p(W^1) p(W^2)}   d W^1 d W^2 \\
&= \int q_{\theta_{W^1}}(W^1)  \bigg( \int  q_{\theta_{W^2}}(W^2)    \bigg[ \log \frac{q_{\theta_{W^1}}(W^1) }{p(W^1)} + \log \frac{q_{\theta_{W^2}}(W^2) }{p(W^2)} \bigg] d W^2 \bigg)dW^1 \\
&= \int q_{\theta_{W^1}}(W^1)  \bigg[\log \frac{q_{\theta_{W^1}}(W^1) }{p(W^1)} +\text{KL}( q_{\theta_{W^2}}(W^2)   \| p(W^2))  \bigg] d W^1 \\
&= \text{KL}( q_{\theta_{W^1}}(W^1)   \| p(W^1)) +\text{KL}( q_{\theta_{W^2}}(W^2)   \| p(W^2)),
\end{aligned}
$$


where (1) we assume that $W^1$ and $W^2$ are independent; this is known as mean-field variational inference. However, we see that finding $q_\theta(\mathbf W)$ requires  a doubled number of parameters (each $w$'s distribution is mean and variance); hence, the approach is not suitable for big models.

<div align="left">

  <img src="https://i.imgur.com/lxrd1Uc.png"/>
  <img src="https://i.imgur.com/ml3zmbP.png"/>
  <div style="color: gray">Fig. 1: Uncertainty from Bayesian Logistic Regression and (1 hidden layer) Neural Network; PyMC3's ADVI is used for the inference.</div>
  <br/>
</div>

### Dropout as Approximation Inference

Dropout is one of the regularization technique used in deep learning. In standard settings, during training, we randomly set activations in the network with probability $\rho$, i.e. the dropout activity is $\text{Ber}(\rho)$. Then, during test time, we turn off the dropout activity and multiply each neuron with $\frac{1}{1 -\rho}$ to compensate the dropout activity. These two steps are called **stochastic** and **deterministic** forward passes respectively. 

Let's take a closer look into this using the previous model. Define $\epsilon^1_{ij} \sim \text{Ber}(1-\rho^1), \epsilon^2_{ij} \sim \text{Ber}(1-\rho^2)$  and the parameters are $M^1 \in \reals^{h \times d}, M^2 \in \reals^{K \times h}, b^1 \in \reals^d, b^2 \in \reals^K$, We have


$$
 f(\mathbf x)  = M^2 \bigg[{  \epsilon^2}\sigma(M^1 (\epsilon^1 \mathbf x  ) + b¹) \bigg] + b^2.
$$


We can see that we can write $\hat W^{1} = M^1 \epsilon^1$ and $\hat W^{2} = M^2 \epsilon^2$.  [Gal (2016)](http://www.cs.ox.ac.uk/people/yarin.gal/website/thesis/9_appendix_A.pdf) shows that the KL term can be approximated


$$
\text{KL}(q_\theta \| p) \approx \frac{1-\rho^1}{2\sigma_w^2}\| M^1 \|_2^2 + hd(\rho^1) + \frac{1-\rho^2}{2\sigma_w^2}\| M^2 \|_2^2 + Kh(\rho^2) + C,
$$


where $C$ is a constant. Define $\hat \omega_\epsilon = \{\hat W^1, \hat W^2\}$. Therefore, the loss function is 


$$
\mathcal L_\text{ELBO-Dropout} {=} \frac{1}{n} \sum_{i} \log p(\mathbf y_i| \mathbf x_i, \hat \omega_\epsilon) - \frac{1-\rho^1}{2\sigma_w^2}\| M^1 \|_2^2  - \frac{1-\rho^2}{2\sigma_w^2}\| M^2 \|_2^2.
$$


Here, it should be noted that  $\rho^1$ and $\rho^2$ also have to chosen properly; for example, one might consider using cross-validation.


## Conclusion
Prediction is only part of the whole story. In the real world, we also need to know when our predictive models are uncertain; this is critical in high stake applications, such as automous vehicles and heathcare. Recent development in variational inference and sampling methods allow us to approximate the posterior, hence enabling extracting uncertainty from the model.

Figures are maded from [Google Colab](https://colab.research.google.com/drive/1qdyGRlbWAI4Ob4QOg2YSqqFzZvLWNKkT?usp=sharing).