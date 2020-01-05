---
path: "/blog/2019-regression-derivation"
date: "2019-12-09"
title: "Regression Derivation"
---

## Maximum Likelihood
Consider a dataset $\mathcal{D} = \{(x_1, y_1), \dots, (x_n, y_n)\}$. We assume that $y_i$ is a corrupted measurement of $x_i$ with some noise $\epsilon \sim \mathcal{N}(0, \sigma_D^2)$, i.e.

$$
y_i = \hat{y}_i + \epsilon.
$$

The goal of regression is to find a model that can capture the relationship between $\hat{y}_i$  and $x_i$. Let $\hat \Theta = \{\theta_1, \dots,\theta_m \}$ be reasonable parameters of this model. Using **Maximum Likelihood Estimation (MLE)**, this objective can be written as 

$$
\begin{aligned}
\hat \Theta &= \underset{\Theta}\text{argmax} \prod_{i=1}^n P(y_i|x_i; \Theta)  \\
&= \underset{\Theta}\text{argmax} \sum_{i=1}^n \ln P(y_i|x_i; \Theta)
\end{aligned}
$$

where $P(y_i|x_i; \hat \Theta)$ is the likelihood that we get such an observation $y_i$ from $x_i$ under a model with parameters $\hat \Theta$.

## Mean-Squared Error
Because we assume that $y_i$ is normally distributed, the objective above is 
$$
\begin{aligned}
\hat{\Theta} &= \underset{\Theta}\text{argmax}  \sum_{i=1}^n \ln \frac{1}{\sigma_D\sqrt{2\pi}} e^{ - \frac{1}{2}\big(\frac{y_i - \hat{y}_i}{\sigma_D}\big)^2} \\
&= \underset{\Theta}\text{argmax} \sum_{i=1}^n \ln \frac{1}{\sigma_D\sqrt{2\pi}} + \ln e^{ - \frac{1}{2}\big(\frac{y_i - \hat{y}_i}{\sigma_D}\big)^2} \\
&=\underset{\Theta}\text{argmax} \sum_{i=1}^n \cancel{\ln \frac{1}{\sigma_D\sqrt{2\pi}}}  - \frac{1}{2}\big(\frac{y_i - \hat{y}_i}{\sigma_D}\big)^2 \\
&= \underset{\Theta}\text{argmax}  \sum_{i=1}^n- \frac{1}{2}\big(\frac{y_i - \hat{y}_i}{\sigma_D}\big)^2    \\
&= \underset{\Theta}\text{argmin}  \sum_{i=1}^n  \cancel{\frac{1}{2\sigma_D^2}} \big({y_i - \hat{y}_i}\big)^2 \\
&= \underset{\Theta}\text{argmin}  \sum_{i=1}^n  \big(y_i - \hat{y}_i \big)^2.
\end{aligned}
$$
We cancel the two terms in the derivation because they do not depends on $\Theta$, hence no influence on the opitimization.

## Maximum a Posteriori
The MLE approach above consider only the likelihood term in Bayes' rule:

$$
\underbrace{P(\Theta| \mathcal{D})}_{\text{Posterior} } = \frac{ \overbrace{P(\mathcal{D}|\Theta)}^{\text{Likelihood}} \overbrace{P(\Theta)}^{\text{Prior}}}{ \underbrace{P(\mathcal{D})}_{\text{Evidence}} }
$$

Because $P(\mathcal{D})$ does not depend on $\Theta$, the posterior is 

$$
P(\Theta| \mathcal{D}) \propto  P(\mathcal{D}|\Theta) P(\Theta).
$$

Using **Maximum a Posteriori (MAP)**, one can find suitable parameters $\hat{\Theta}$ by maximizing $P(\theta|\mathcal{D})$:

$$
\begin{aligned}
\hat \Theta &= \underset{\Theta}\text{argmax}  \bigg( \prod_{i=1}^n P(y_i|x_i; \Theta) \bigg) P(\Theta)  \\
&= \underset{\Theta}\text{argmax}  \bigg( \sum_{i=1}^n \ln P(y_i|x_i; \Theta) \bigg) +  \ln P(\Theta).
\end{aligned}
$$

Consider each parameter $\theta_i \sim \mathcal{N}(0, \sigma_{\theta}^2)$. The second term is then

$$
\begin{aligned}
\ln P(\Theta) &= \ln \prod_{j=1}^{m}  \frac{1}{\sigma_\theta \sqrt{2\pi}} e^{ - \frac{1}{2}\big(\frac{\theta_j}{\sigma_\theta}\big)^2}  \\
& = \sum_{j=1}^m \ln \frac{1}{\sigma_\theta \sqrt{2\pi}} e^{ - \frac{1}{2}\big(\frac{\theta_j}{\sigma_\theta}\big)^2}. 
\end{aligned}
$$


## $L_2$ Regularizer (Weight Decay)

Borrowing the intermediate derivation step of the likelihood term from the previous section and substituting the prior term into the optimization yield

$$
\begin{aligned}
\hat{\Theta} &= \underset{\Theta}\text{argmax}  \sum_{i=1}^n- \frac{1}{2}\big(\frac{y_i - \hat{y}_i}{\sigma_D}\big)^2 + \sum_{j=1}^m \ln \frac{1}{\sigma_\theta \sqrt{2\pi}} e^{ - \frac{1}{2}\big(\frac{\theta_j}{\sigma_\theta}\big)^2} \\
&=\underset{\Theta}\text{argmax}  \sum_{i=1}^n - \frac{1}{2}\big(\frac{y_i - \hat{y}_i}{\sigma_D}\big)^2 - \frac{1}{2} \sum_{j=1}^m \bigg(\frac{\theta_j}{\sigma_\theta}\bigg)^2 - \cancel{m \ln \sigma_\theta \sqrt{2\pi}}\\
&=\underset{\Theta}\text{argmin}  \sum_{i=1}^n \big(\frac{y_i - \hat{y}_i}{\sigma_D}\big)^2 + \sum_{j=1}^m \bigg(\frac{\theta_j}{\sigma_\theta}\bigg)^2 \\
&=\underset{\Theta}\text{argmin}  \sum_{i=1}^n (y_i - \hat{y}_i)^2 + \underbrace{\bigg(\frac{\sigma_D}{\sigma_\theta} \bigg)^2}_\lambda  \sum_{j=1}^m \theta_j^2.
\end{aligned}
$$
For the last step, we multiply $\sigma_D^2$, which is positive, to the equation. From the result above, $\lambda$ is a hyperparameter that governs how much we would like to regularize the model, and one can interpret it as the ratio between the variances of data and parameters.

## Acknowledgements
The content of this article is largely summarised from 
- [Aaron Courville's Bayesian Methods for Neural Networks](https://www.cs.cmu.edu/afs/cs/academic/class/15782-f06/slides/bayesian.pdf);
- [Geoffrey Hinton's The Bayesian interpretation of weight decay](https://www.youtube.com/watch?v=KCo8h3WAClc).